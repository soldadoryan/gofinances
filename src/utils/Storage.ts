import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
    getAll = async (key: string) => {
        const data = await AsyncStorage.getItem(key);
        return (data !== null) ? JSON.parse(data!) : null;
    }

    get = async (key: string, value: string) => {
        const data = await AsyncStorage.getItem(key);
        return (data !== null) ? JSON.parse(data)[value] : null;
    }

    set = async (key: string, value: [] | {}) => {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    };

    add = async (key: string, index: string, value: string) => {
        const data = await AsyncStorage.getItem(key);
        if (data !== null) {
            let collection = JSON.parse(data!);
            await AsyncStorage.setItem(key, JSON.stringify({ ...collection, [index]: value }));
        } else {
            await AsyncStorage.setItem(key, JSON.stringify({ [index]: value }));
        }
    };

    removeAll = async (key: string) => await AsyncStorage.removeItem(key);
};

export default new Storage();