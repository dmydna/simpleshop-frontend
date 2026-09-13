import { useUrlParams } from '@/hooks/useUrlParams';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';


export const useValidationFormModes = (initialData) => {
    

    const [selectedFile, setSelectedFile] = useState(null);
    const { editMode, viewMode, createMode } = useUrlParams();
    const [enabledFields, setEnabledFields] = useState({});

    const dataRef = useRef(initialData);
    const stableInitialData = useMemo(() => {
        const isDifferent = JSON.stringify(initialData) !== JSON.stringify(dataRef.current);
        if (isDifferent) {
            dataRef.current = initialData;
        }
        return dataRef.current;
    }, [initialData]);

    const {
        register,
        getValues,
        watch,
        setValue,
        reset,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        defaultValues: stableInitialData || {},
    });

    // Lógica de Modos y Bloqueos
    const isFieldDisabled = (field) => {
        if (createMode) return false;
        if (viewMode) return true;
        if (editMode) { return !enabledFields[field];}
        return false;
    };

    const handleEnableField = useCallback((field) => {
        setEnabledFields(prev => ({ ...prev, [field]: true }));
    }, []);

    useEffect(() => {
        if (stableInitialData && Object.keys(stableInitialData).length > 0) {
            reset(stableInitialData);
            setEnabledFields({});
        }
    }, [stableInitialData, reset]);

    // Manejo de acciones con esquemas dinámicos
    const handleAction = async (actionCallback, validationSchema) => {
        clearErrors(); // Limpia errores previos
        const currentData = getValues();

        // Validar manualmente con el esquema proporcionado
        if (validationSchema) {
            const result = await validationSchema.safeParseAsync(currentData);

            if (!result.success) {
                // Mapear errores de Zod directamente al estado de React Hook Form
                result.error.issues.forEach((issue) => {
                    const fieldName = issue.path.join('.');
                    setError(fieldName, {
                        type: 'manual',
                        message: issue.message,
                    });
                });

                window.scrollTo({ top: 0, behavior: 'smooth' });
                return false;
            }
        }

        // Si la validación pasa, ejecuta la acción
        await actionCallback(currentData, selectedFile);
        return true;
    };

    return {
        register,
        watch,
        setValue,
        reset,
        errors,
        selectedFile,
        setSelectedFile,
        isFieldDisabled,
        handleEnableField,
        getValues,
        showCopyButton: viewMode,
        showEditButton: editMode,
        handleAction
    };
};