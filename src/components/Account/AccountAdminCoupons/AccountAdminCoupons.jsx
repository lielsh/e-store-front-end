import { CustomFilter, CustomActionsButtons, CustomBulkActionButtons, CustomEditToolbar } from '../CustomFields/CustomFields'
import { 
    List,
    Datagrid,
    TextField,
    NumberField,
    EditButton,
    DeleteWithConfirmButton,
    BooleanField,
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    BooleanInput,
    required,
    maxLength,
    minValue,
    maxValue,
    Edit,
    Show,
    SimpleShowLayout
} from 'react-admin';

const CouponPanel  = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id"/>
            <TextField source="name"/>
            <NumberField source="discount"/>
            <BooleanField source="active"/>
        </SimpleShowLayout>
    </Show>
);

export const CouponList = props => (
    <List {...props} filters={<CustomFilter/>} actions={<CustomActionsButtons/>} bulkActionButtons={<CustomBulkActionButtons/>}>
        <Datagrid rowClick="expand" expand={<CouponPanel/>}>
            <TextField source="name"/>
            <NumberField source="discount"/>
            <BooleanField source="active"/>
            <EditButton />
            <DeleteWithConfirmButton />
        </Datagrid>
    </List>
);

export const CouponCreate = props => (    
    <Create {...props}>
        <SimpleForm>
            <TextInput onChange={(e) =>  e.target.style.textTransform = "uppercase"} source="name" validate={[required(), maxLength(10)]}/>
            <NumberInput source="discount" min="0.00" max="1" step="0.00" defaultValue={0.00} validate={[required(), minValue(0.00), maxValue(1)]} />
            <BooleanInput source="active" defaultValue={true} disabled validate={[required()]} />
        </SimpleForm>
    </Create>
);

export const CouponEdit = props => (
    <Edit {...props} undoable={false}>
        <SimpleForm toolbar={<CustomEditToolbar/>}>
            <TextInput disabled source="id" />
            <TextInput source="name" validate={[required(), maxLength(10)]} style={{textTransform: "uppercase"}}/>
            <NumberInput source="discount" min="0.00" max="1" step="0.00" defaultValue={0.00} validate={[required(), minValue(0.00), maxValue(1)]} />
            <BooleanInput source="active" validate={[required()]} />
        </SimpleForm>
    </Edit>
);