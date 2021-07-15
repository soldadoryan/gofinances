import categories from "../utils/categories";
import Storage from "../utils/Storage";
import { Category } from "../screens/CategorySelect";
import { DataListProps } from "../screens/Dashboard";

interface CategoryProps extends Category {
  color: string,
  icon: string,
}

class ResumeInfo {
  storageKey = '@gofinance:transactions';

  totalPerCategory = async (dateFilter: string) => {
    const transactions = await Storage.getAll(this.storageKey) || [];
    const expensives = transactions.filter((transaction: DataListProps) => {
      const currentDate = new Date(transaction.date);
      const filterDate = new Date(dateFilter);
      return transaction.type === 'down' &&
        (filterDate.getMonth() === currentDate.getMonth()) &&
        (filterDate.getFullYear() === currentDate.getFullYear());
    });

    const total = expensives.reduce((acumullator: number, expensive: DataListProps) => Number(acumullator) + Number(expensive.amount), 0);

    return categories.map((category: CategoryProps) => {
      let categorySum = 0;

      expensives.forEach((transaction: DataListProps) => {
        if (transaction.categoryKey === category.key) {
          categorySum += Number(transaction.amount);
        }
      });

      return {
        ...category,
        amount: categorySum,
        percent: (categorySum / total * 100).toFixed(0) + '%',
      };
    }).sort((a, b) => {
      if (a.amount < b.amount) return 1;
      if (b.amount < a.amount) return -1;
      return 0;
    }).filter(({ amount }) => amount !== 0)
  };
}

export default new ResumeInfo();