import { CRUD } from "@/utils/enums";
import { ListingDraftDTO } from "@/utils/schemas";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";


// TODO: cambiar de nombre pendiente
// TODO: mover a @dashboard

/** Este componete  declara todos los parametros busquedas que se usaran en la app*/
export const useUrlParams = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const itemId = searchParams.get('hash') || searchParams.get('id');
    const copyMode = searchParams.get('mode') === 'copy';

    const allParams = useMemo(() => searchParams.toString(),[searchParams])

    const editMode = searchParams.get('mode') === 'edit';
    const draftMode = searchParams.get('mode') === 'draft';
    const viewMode = searchParams.get('mode') === 'view';
    const createMode = searchParams.get('mode') === 'create';
    const create_draftMode = searchParams.get('mode') === 'create.draft';
    const edit_draftMode = searchParams.get('mode') === 'edit.draft';
    const validate = searchParams.get('validate');

    const availabilityParam = searchParams.get('availability');
    const tableVersion = searchParams.get('tableVersion');
    const tagsParam = searchParams.get('tags');
    const hashParam = searchParams.get('hash'); 
    const pageParam = searchParams.get('page');
    const idParam = searchParams.get('id');
    const searchParam = searchParams.get('search');
    const categoryParam = searchParams.get('category');
    const statusParam = searchParams.get('status');
    const roleParam = searchParams.get('role');
    const skuParam = searchParams.get('sku');
    const sortParam = searchParams.get('sort');
    const pageVersion = searchParams.get('pageVersion');
    const modeParam = searchParams.get('mode');
    const minPrice =  searchParams.get('minPrice');
    const maxPrice =  searchParams.get('maxPrice');
    const dialogParam = searchParams.get('dialog');

    const create_banMode = searchParams.get('dialog') == "ban.create";
    const update_banMode = searchParams.get('dialog') == "ban.update";


    const filterParam = searchParams.get('filter') == 'true';


    return {
       editMode, viewMode, createMode, copyMode, 
       draftMode, edit_draftMode,create_draftMode,itemId, 
       availabilityParam, tableVersion, tagsParam, hashParam, pageParam,
       idParam, searchParam, categoryParam, statusParam, roleParam, skuParam,
       sortParam, filterParam, allParams, create_banMode, update_banMode,
       pageVersion, modeParam, minPrice, maxPrice, dialogParam,
       validate,
    }
}
