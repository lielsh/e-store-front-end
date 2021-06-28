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
    SimpleShowLayout,
    ReferenceInput,
    SelectInput,
    ChipField
} from 'react-admin';

const TypePanel  = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id"/>
            <TextField source="name"/>
            <ChipField label="Subcategory" source="subcategory.name"/>
        </SimpleShowLayout>
    </Show>
);

export const TypeList = props => (
    <List {...props} filters={<CustomFilter/>} actions={<CustomActionsButtons/>} bulkActionButtons={<Fragment/>}>
        <Datagrid rowClick="expand" expand={<TypePanel/>}>
            <TextField source="name"/>
            <ChipField label="Subcategory" source="subcategory.name"/>
            <EditButton />
        </Datagrid>
    </List>
);

export const TypeCreate = props => (    
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" validate={[required()]}/>
            <ReferenceInput source="subcategory" reference="products-subcategories" sort={{ field: 'name', order: 'ASC' }}>
                <SelectInput optionText="name" validate={[required()]}/>
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export const TypeEdit = props => (
    <Edit {...props} undoable={false}>
        <SimpleForm toolbar={<CustomEditToolbarWithoutDelete/>}>
            <TextInput disabled source="id" />
            <TextInput source="name" validate={[required()]}/>
            <ReferenceInput label="Subcategory" source="subcategory.id" reference="products-subcategories" sort={{ field: 'name', order: 'ASC' }}>
                <SelectInput optionText="name" validate={[required()]}/>
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);