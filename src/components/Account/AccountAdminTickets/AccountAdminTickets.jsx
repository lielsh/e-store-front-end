import { Fragment } from 'react';
import { CustomFilter, CustomActionsButtonsWithoutCreate, CustomEditToolbarWithoutDelete } from '../CustomFields/CustomFields'
import { 
    List,
    Datagrid,
    TextField,
    EditButton,
    Edit,
    SimpleForm,
    TextInput,
    required,
    SelectInput,
    Show,
    SimpleShowLayout,
    ReferenceInput,
    ChipField
} from 'react-admin';

const TicketPanel  = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="datetime" />
            <TextField source="email" />
            <TextField source="name" />
            <TextField source="subject" />
            <TextField source="message" />
            <ChipField source="comments" />
            <ChipField label="Status" source="status.name" />
        </SimpleShowLayout>
    </Show>
);

export const TicketList = props => (
    <List {...props} filters={<CustomFilter/>} actions={<CustomActionsButtonsWithoutCreate/>} bulkActionButtons={<Fragment/>} >
        <Datagrid rowClick="expand" expand={<TicketPanel />}>
            <TextField source="id" />
            <TextField source="datetime" />
            <TextField source="email" />
            <TextField source="name" />
            <TextField source="subject" />
            <ChipField label="Status" source="status.name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const TicketEdit = props => (
    <Edit {...props} undoable={false}>
        <SimpleForm toolbar={<CustomEditToolbarWithoutDelete />} redirect="list">
            <TextInput source="id" disabled/>
            <TextInput source="datetime" disabled/>
            <TextInput source="email" disabled/>
            <TextInput source="name" disabled/>
            <TextInput source="subject" disabled/>
            <TextInput multiline source="message" disabled/>
            <TextInput multiline source="comments" />
            <ReferenceInput label="Status" source="status.id" reference="tickets-status" sort={{ field: 'name', Ticket: 'ASC' }}>
                <SelectInput optionText="name" validate={[required()]}/>
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);