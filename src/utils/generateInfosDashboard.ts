import { DataListProps } from "../screens/Dashboard";
import Categories from './categories';
import Formatter from "./Formatter";
import { LastTransactions } from "../screens/Dashboard";

export default (list: DataListProps[]) => {

    let sumUp = 0, sumDown = 0;

    const lastTransactions: LastTransactions = { up: '--', down: '--' };
    const firstTransaction = list !== null ? list[0].date : '--';

    return {
        transactions: list !== null ? list.reverse().map((item: DataListProps) => {

            if (item.type === 'up') {
                sumUp += Number(item.amount);
                if (lastTransactions.up === '--') lastTransactions.up = item.date;
            }
            else {
                sumDown += Number(item.amount);
                if (lastTransactions.down === '--') lastTransactions.down = item.date;
            }

            const category = Categories.filter(({ key }) => key === item.categoryKey)[0];

            return {
                id: item.id,
                name: item.name,
                amount: Formatter.currency(item.amount),
                type: item.type,
                categoryKey: item.categoryKey,
                category,
                date: Formatter.date(item.date),
            };
        }) : [],
        sumUp,
        sumDown,
        lastTransactions,
        firstTransaction
    }
}