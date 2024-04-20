import React from 'react';
import { FlatList } from 'react-native';
import Contact from './Contact';
import { ContactData } from './interface';

const ContactList: React.FC<{ contacts: ContactData[] }> = ({ contacts }) => {
    const renderItem = ({ item }: { item: ContactData }) => {
        return <Contact contact={item} />;
    };

    return (
        <FlatList
            data={contacts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default ContactList;
