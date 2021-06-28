import { CustomFilter, CustomActionsButtons, CustomBulkActionButtons, CustomEditToolbar } from '../CustomFields/CustomFields'
import SimpleChipField from "../SimpleChipField/SimpleChipField";
import { 
    List,
    Datagrid,
    TextField,
    NumberField,
    ArrayField,
    EditButton,
    DeleteWithConfirmButton,
    BooleanField,
    Edit,
    SimpleForm,
    TextInput,
    required,
    BooleanInput,
    Create,
    NumberInput,
    SingleFieldList,
    ArrayInput,
    SimpleFormIterator,
    SelectInput,
    Show,
    SimpleShowLayout,
    minValue,
    maxValue,
    ReferenceInput,
    ChipField,
    ImageInput,
    ImageField
} from 'react-admin';

const ProductPanel  = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id"/>
            <TextField source="name"/>
            <ArrayField label="Images" source="img">
                <Datagrid>
                    <ChipField source="title"/>
                    <BooleanField source="active"/>
                </Datagrid>
            </ArrayField>
            <TextField source="title"/>
            <TextField source="subtitle"/>
            <ArrayField source="details">
                <SingleFieldList>
                    <SimpleChipField />
                </SingleFieldList>
            </ArrayField>
            <NumberField source="price"/>
            <NumberField source="rating"/>
            <BooleanField source="stock"/>
            <BooleanField source="discount"/>
            <NumberField label="Discount %" source="discountPercentage"/>
            <ChipField label="Category" source="category.name"/>
            <ChipField label="Subcategory" source="subcategory.name"/>
            <ChipField label="Type" source="type.name"/>
            <ChipField label="Brand" source="brand.name"/>
        </SimpleShowLayout>
    </Show>
);

export const ProductList = props => (
    <List {...props} filters={<CustomFilter/>} actions={<CustomActionsButtons/>} bulkActionButtons={<CustomBulkActionButtons/>} >
        <Datagrid rowClick="expand" expand={<ProductPanel/>}>
            <TextField source="title"/>
            <NumberField source="price"/>
            <NumberField source="rating"/>
            <BooleanField source="stock"/>
            <BooleanField source="discount"/>
            <NumberField label="Discount%" source="discountPercentage"/>
            <ChipField label="Category" source="category.name"/>
            <ChipField label="Subcategory" source="subcategory.name"/>
            <ChipField label="Type" source="type.name"/>
            <ChipField label="Brand" source="brand.name"/>
            <EditButton />
            <DeleteWithConfirmButton />
        </Datagrid>
    </List>
);

export const ProductEdit = props => (
    <Edit {...props} undoable={false}>
        <SimpleForm toolbar={<CustomEditToolbar/>}>
            <TextInput disabled source="id" />
            <TextInput source="name" validate={[required()]} />
            <ArrayInput label="Images" source="img" validate={[required()]}>
                <SimpleFormIterator disableAdd disableRemove>
                    <TextInput label="Title" source="title" disabled/>
                    <BooleanInput label="Active" source="active"/>
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="title" validate={[required()]}/>
            <TextInput source="subtitle"/>
            <ArrayInput source="details" validate={[required()]}>
                <SimpleFormIterator>
                    <TextInput />
                </SimpleFormIterator>
            </ArrayInput>
            <NumberInput min="0.01" step="0.01" source="price" validate={[required(), minValue(0.01)]}/>
            <NumberInput min="0" max="5" step="0.5" source="rating" validate={[required(), minValue(0), maxValue(5)]}/>
            <BooleanInput source="stock" defaultValue={true} validate={[required()]}/>
            <BooleanInput source="discount" defaultValue={false} validate={[required()]}/>
            <NumberInput min="0.01" max="0.99" step="0.01" label="Discount %" source="discountPercentage" defaultValue="0.01" validate={[required(), minValue(0.01), maxValue(0.99)]}/>
            <ReferenceInput label="Category" source="category.id" reference="products-categories" sort={{ field: 'name', order: 'ASC' }}>
                <SelectInput optionText="name" validate={[required()]}/>
            </ReferenceInput>
            <ReferenceInput label="Subcategory" source="subcategory.id" reference="products-subcategories" sort={{ field: 'name', order: 'ASC' }}>
                <SelectInput optionText="name" validate={[required()]}/>
            </ReferenceInput>
            <ReferenceInput label="Type" source="type.id" reference="products-types" sort={{ field: 'name', order: 'ASC' }}>
                <SelectInput optionText="name" validate={[required()]}/>
            </ReferenceInput>
            <ReferenceInput label="Brand" source="brand.id" reference="products-brands" sort={{ field: 'name', order: 'ASC' }}>
                <SelectInput optionText="name" validate={[required()]}/>
            </ReferenceInput>
            <ImageInput multiple source="pictures" labelMultiple="Drop some pictures to upload, or click to select one (up to 10MB)." accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);

export const ProductCreate = props => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput source="name" validate={[required()]} />
            <TextInput source="title" validate={[required()]}/>
            <TextInput source="subtitle"/>
            <ArrayInput source="details" validate={[required()]}>
                <SimpleFormIterator>
                    <TextInput />
                </SimpleFormIterator>
            </ArrayInput>
            <NumberInput min="0.01" step="0.01" source="price" validate={[required(), minValue(0.01)]}/>
            <NumberInput min="0" max="5" step="0.5" defaultValue="0" source="rating" validate={[required(), minValue(0), maxValue(5)]}/>
            <BooleanInput source="stock" defaultValue={true} validate={[required()]}/>
            <BooleanInput source="discount" defaultValue={false} validate={[required()]}/>
            <NumberInput min="0.01" max="0.99" step="0.01" label="Discount %" source="discountPercentage" defaultValue="0.01" validate={[required(), minValue(0.01), maxValue(0.99)]}/>
            <ReferenceInput source="category" reference="products-categories" sort={{ field: 'name', order: 'ASC' }}>
                <SelectInput optionText="name" validate={[required()]}/>
            </ReferenceInput>
            <ReferenceInput source="subcategory" reference="products-subcategories" sort={{ field: 'name', order: 'ASC' }}>
                <SelectInput optionText="name" validate={[required()]}/>
            </ReferenceInput>
            <ReferenceInput source="type" reference="products-types" sort={{ field: 'name', order: 'ASC' }}>
                <SelectInput optionText="name" validate={[required()]}/>
            </ReferenceInput>
            <ReferenceInput source="brand" reference="products-brands" sort={{ field: 'name', order: 'ASC' }}>
                <SelectInput optionText="name" validate={[required()]}/>
            </ReferenceInput>
            <ImageInput multiple source="pictures" accept="image/*" labelMultiple="Drop some pictures to upload, or click to select one (up to 10MB)." validate={[required()]}>
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
);