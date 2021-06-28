import { Fragment } from 'react';
import { CustomFilter, CustomActionsButtons, CustomEditToolbarWithoutDelete } from '../CustomFields/CustomFields'
import { 
    List,
    Datagrid,
    TextField,
    EditButton,
    Create,
    SimpleForm,
    TextInput,
    required,
    Edit,
    Show,
    SimpleShowLayout
} from 'react-admin';

const StatusPanel  = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id"/>
            <TextField source="name"/>
        </SimpleShowLayout>
    </Show>
);

export const StatusList = props => (
    <List {...props} filters={<CustomFilter/>} actions={<CustomActionsButtons/>} bulkActionButtons={<Fragment/>}>
        <Datagrid rowClick="expand" expand={<StatusPanel/>}>
            <TextField source="name"/>
            <EditButton />
        </Datagrid>
    </List>
);

export const StatusCreate = props => (    
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" validate={[required()]}/>
        </SimpleForm>
    </Create>
);

export const StatusEdit = props => (
    <Edit {...props} undoable={false}>
        <SimpleForm toolbar={<CustomEditToolbarWithoutDelete/>}>
            <TextInput disabled source="id" />
            <TextInput source="name" validate={[required()]}/>
        </SimpleForm>
    </Edit>
);