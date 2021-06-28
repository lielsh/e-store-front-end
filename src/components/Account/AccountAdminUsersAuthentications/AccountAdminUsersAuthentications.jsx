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

const AuthPanel  = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id"/>
            <TextField source="name"/>
        </SimpleShowLayout>
    </Show>
);

export const AuthList = props => (
    <List {...props} filters={<CustomFilter/>} actions={<CustomActionsButtons/>} bulkActionButtons={<Fragment/>}>
        <Datagrid rowClick="expand" expand={<AuthPanel/>}>
            <TextField source="name"/>
            <EditButton />
        </Datagrid>
    </List>
);

export const AuthCreate = props => (    
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" validate={[required()]}/>
        </SimpleForm>
    </Create>
);

export const AuthEdit = props => (
    <Edit {...props} undoable={false}>
        <SimpleForm toolbar={<CustomEditToolbarWithoutDelete/>}>
            <TextInput disabled source="id" />
            <TextInput source="name" validate={[required()]}/>
        </SimpleForm>
    </Edit>
);