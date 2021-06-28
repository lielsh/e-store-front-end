import { Fragment } from 'react';
import { CustomFilter, CustomActionsButtonsWithoutCreate } from '../CustomFields/CustomFields'
import SimpleChipField from "../SimpleChipField/SimpleChipField";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { 
    List,
    Datagrid,
    TextField,
    EditButton,
    Edit,
    SimpleForm,
    TextInput,
    required,
    Toolbar,
    SaveButton,
    SelectInput,
    ArrayField,
    SingleFieldList,
    ArrayInput,
    SimpleFormIterator,
    Show,
    SimpleShowLayout,
    Button,
    BooleanField,
    ReferenceInput,
    ChipField
} from 'react-admin';

const OrderEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
        <Button label="REFUND" icon={AttachMoneyIcon} className="text-warning btn-warning"/>
    </Toolbar>
);

const OrderPanel  = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="datetime" />
            <TextField label="User Id" source="uid.id" />
            <ArrayField source="productsInCart">
                <Datagrid>
                    <TextField label="Product" source="prodId.title" />
                    <TextField label="Quantity" source="prodQuantity" />
                </Datagrid>
            </ArrayField>
            <ArrayField source="coupons" >
                <SingleFieldList >
                    <SimpleChipField />
                </SingleFieldList>
            </ArrayField>
            <ArrayField source="shipping" >
                <SingleFieldList >
                    <SimpleChipField />
                </SingleFieldList>
            </ArrayField>
            <TextField source="payment" />
            <TextField source="total" />
            <ChipField label="Status" source="status.name" />
            <BooleanField source="refund" />
        </SimpleShowLayout>
    </Show>
);

export const OrderList = props => (
    <List {...props} filters={<CustomFilter/>} actions={<CustomActionsButtonsWithoutCreate/>} bulkActionButtons={<Fragment/>} >
        <Datagrid rowClick="expand" expand={<OrderPanel />}>
            <TextField source="id" />
            <TextField source="datetime" />
            <TextField label="User Id" source="uid.id" />
            <TextField source="payment" />
            <TextField source="total" />
            <ChipField label="Status" source="status.name" />
            <BooleanField source="refund" />
            <EditButton />
        </Datagrid>
    </List>
);

export const OrderEdit = props => (
    <Edit {...props} undoable={false}>
        <SimpleForm toolbar={<OrderEditToolbar />} redirect="list">
            <TextInput source="id" disabled />
            <TextInput source="datetime" disabled />
            <TextInput label="User Id" source="uid.id" disabled />
            <ArrayInput source="productsInCart" disabled>
                <SimpleFormIterator>
                    <TextInput label="Product" source="prodId.title"/>
                    <TextInput label="Quantity" source="prodQuantity" />
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="coupons" disabled>
                <SimpleFormIterator>
                    <TextInput />
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="shipping" disabled>
                <SimpleFormIterator>
                    <TextInput />
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="payment" disabled />
            <TextInput source="total" disabled />
            <ReferenceInput label="Status" source="status.id" reference="orders-status" sort={{ field: 'name', order: 'ASC' }}>
                <SelectInput optionText="name" validate={[required()]}/>
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);