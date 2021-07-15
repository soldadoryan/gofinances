import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
    getAll = async (key: string) => {
        const data = await AsyncStorage.getItem(key);
        return (data !== null) ? JSON.parse(data!) : null;
    }

    set = async (key: string, value: [] | {}) => {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    };

    add = async (key: string, value: {}) => {
        const data = await AsyncStorage.getItem(key);
        if (data !== null) {
            let collection = JSON.parse(data!);
            await AsyncStorage.setItem(key, JSON.stringify([...collection, value]));
        } else {
            await AsyncStorage.setItem(key, JSON.stringify([value]));
        }
    };

    removeAll = async (key: string) => await AsyncStorage.removeItem(key);
};

export default new Storage();