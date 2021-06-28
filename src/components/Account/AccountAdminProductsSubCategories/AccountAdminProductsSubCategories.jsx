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

const SubCategoryPanel  = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id"/>
            <TextField source="name"/>
            <ChipField label="Category" source="category.name"/>
        </SimpleShowLayout>
    </Show>
);

export const SubCategoryList = props => (
    <List {...props} filters={<CustomFilter/>} actions={<CustomActionsButtons/>} bulkActionButtons={<Fragment/>}>
        <Datagrid rowClick="expand" expand={<SubCategoryPanel/>}>
            <TextField source="name"/>
            <ChipField label="Category" source="category.name"/>
            <EditButton />
        </Datagrid>
    </List>
);

export const SubCategoryCreate = props => (    
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" validate={[required()]}/>
            <ReferenceInput source="category" reference="products-categories" sort={{ field: 'name', order: 'ASC' }}>
                <SelectInput optionText="name" validate={[required()]}/>
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export const SubCategoryEdit = props => (
    <Edit {...props} undoable={false}>
        <SimpleForm toolbar={<CustomEditToolbarWithoutDelete/>}>
            <TextInput disabled source="id" />
            <TextInput source="name" validate={[required()]}/>
            <ReferenceInput label="Category" source="category.id" reference="products-categories" sort={{ field: 'name', order: 'ASC' }}>
                <SelectInput optionText="name" validate={[required()]}/>
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);