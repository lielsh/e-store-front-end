import { Fragment } from 'react';
import { CustomFilter, CustomActionsButtons, CustomEditToolbarWithoutDelete } from '../CustomFields/CustomFields'
import { 
    List,
    Datagrid,
    TextField,
    EmailField,
    EditButton,
    Edit,
    SimpleForm,
    TextInput,
    Create,
    required,
    BooleanInput,
    SelectInput,
    email,
    BooleanField,
    Show,
    SimpleShowLayout,
    ReferenceInput,
    ChipField
} from 'react-admin';

const UserPanel  = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField label="First Name" source="fname" />
            <TextField label="Last Name" source="lname" />
            <EmailField source="email" />
            <TextField source="mobile" />
            <TextField source="address" />
            <TextField source="city" />
            <TextField source="country" />
            <TextField label="Zip Code" source="zipcode"/>
            <ChipField label="Role" source="role.name" />
            <ChipField label="Authentication" source="auth.name" />
            <BooleanField source="active" />
        </SimpleShowLayout>
    </Show>
);

export const UserList = props => (
    <List {...props} filters={<CustomFilter/>} actions={<CustomActionsButtons/>} bulkActionButtons={<Fragment/>} >
        <Datagrid rowClick="expand" expand={<UserPanel />}>
            <TextField label="First Name" source="fname" />
            <TextField label="Last Name" source="lname" />
            <EmailField source="email" />
            <TextField source="mobile" />
            <TextField source="address" />
            <TextField source="city" />
            <TextField source="country" />
            <TextField label="Zip Code" source="zipcode"/>
            <ChipField label="Role" source="role.name" />
            <ChipField label="Authentication" source="auth.name" />
            <BooleanField source="active" />
            <EditButton />
        </Datagrid>
    </List>
);

export const UserEdit = props => (
    <Edit {...props} undoable={false}>
        <SimpleForm toolbar={<CustomEditToolbarWithoutDelete/>}>
            <TextInput disabled source="id" />
            <TextInput disabled type="email" source="email"/>
            <TextInput label="First Name" source="fname"/>
            <TextInput label="Last Name" source="lname"/>
            <TextInput source="mobile"/>
            <TextInput source="address"/>
            <TextInput source="city"/>
            <TextInput source="country"/>
            <TextInput label="Zip Code" source="zipcode"/>
            <ReferenceInput label="Role" source="role.id" reference="users-roles" sort={{ field: 'name', order: 'ASC' }}>
                <SelectInput optionText="name" validate={[required()]}/>
            </ReferenceInput>
            <ReferenceInput label="Authentication" source="auth.id" reference="users-auths" sort={{ field: 'name', order: 'ASC' }}>
                <SelectInput optionText="name" validate={[required()]} disabled/>
            </ReferenceInput>
            <BooleanInput source="active" validate={[required()]}/>
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput type="email" source="email" validate={[required(), email()]} />
            <TextInput label="First Name" source="fname"/>
            <TextInput label="Last Name" source="lname"/>
            <TextInput source="mobile"/>
            <TextInput source="address"/>
            <TextInput source="city"/>
            <TextInput source="country"/>
            <TextInput label="Zip Code" source="zipcode"/>
            <ReferenceInput label="Role" source="role.name" reference="users-roles" sort={{ field: 'name', order: 'ASC' }}>
                <SelectInput optionText="name" validate={[required()]}/>
            </ReferenceInput>
            <BooleanInput source="active" defaultValue={true} validate={[required()]} disabled/>
        </SimpleForm>
    </Create>
);