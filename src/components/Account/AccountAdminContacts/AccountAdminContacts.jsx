import { CustomActionsButtonsWithoutCreate, CustomEditToolbarWithoutDelete } from '../CustomFields/CustomFields'
import { 
    List,
    Datagrid,
    TextField,
    EditButton,
    SimpleForm,
    TextInput,
    required,
    Edit,
    ImageField,
    NumberField,
    NumberInput,
    minValue,
    maxValue,
    ImageInput
} from 'react-admin';

export const ContactList = props => (
    <List {...props} actions={<CustomActionsButtonsWithoutCreate/>} bulkActionButtons={false}>
        <Datagrid>
            <TextField source="name"/>
            <TextField source="address"/>
            <TextField source="city"/>
            <TextField source="country"/>
            <TextField source="telephone"/>
            <NumberField source="latitude"/>
            <NumberField source="longitude"/>
            <NumberField source="zoom"/>
            <ImageField source="logo"/>
            <EditButton />
        </Datagrid>
    </List>
);

export const ContactEdit = props => (
    <Edit {...props} undoable={false}>
        <SimpleForm toolbar={<CustomEditToolbarWithoutDelete/>}>
            <TextInput source="name" validate={[required()]}/>
            <TextInput source="address" validate={[required()]}/>
            <TextInput source="city" validate={[required()]}/>
            <TextInput source="country" validate={[required()]}/>
            <TextInput source="telephone" validate={[required()]}/>
            <NumberInput source="latitude" validate={[required()]}/>
            <NumberInput source="longitude" validate={[required()]}/>
            <NumberInput source="zoom" min="0" max='18' validate={[required(), minValue(0), maxValue(18)]}/>
            <ImageInput source="pictures" accept="image/*" labelSingle="Drop or click to select and upload one image (up to 10MB).">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);