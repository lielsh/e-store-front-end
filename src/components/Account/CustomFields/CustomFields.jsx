import { Fragment } from 'react';
import { 
    Filter,
    TextInput,
    RefreshButton,
    CreateButton,
    ExportButton,
    BulkDeleteWithConfirmButton,
    Toolbar,
    SaveButton,
    DeleteWithConfirmButton
} from 'react-admin';

export const CustomFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
)

export const CustomActionsButtons = props => {

    const picked = (({ basePath, className , resource}) => ({  basePath, className , resource}))(props);

    return(
        <div>
            <RefreshButton {...picked} />
            <CreateButton {...picked} />
            <ExportButton {...picked} />
        </div>
)}

export const CustomActionsButtonsWithoutCreate = () => (
    <div>
        <RefreshButton/>
        <ExportButton/>
    </div>
)

export const CustomBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteWithConfirmButton {...props} />
    </Fragment>
)

export const CustomEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton/>
        <DeleteWithConfirmButton/>
    </Toolbar>
)

export const CustomEditToolbarWithoutDelete = props => (
    <Toolbar {...props} >
        <SaveButton/>
    </Toolbar>
)