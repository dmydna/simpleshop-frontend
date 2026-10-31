import { URL_SIGIN } from "@/utils/links";
import UserTable from "@/features/user/components/UserTable";
import SearchLight from "@/features/search/SearchLight";
import AddNewButton from "@/features/form/components/AddNewButton";

const UserListPage = () => {

    return (
        <>
            <div className="visually-hidden">
                <p className="h5  mb-3">
                    User List
                </p>
            </div>
            <div className="d-flex justify-content-between mb-4 flex-wrap" >
                <div className="d-flex gap-3">
                    <AddNewButton to={URL_SIGIN} />
                </div>
                <SearchLight />

            </div>
            <UserTable/>
        </>

    );
}


export default UserListPage;
