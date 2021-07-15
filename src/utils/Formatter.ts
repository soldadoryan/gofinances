import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

class Formatter {
    currency = (amount: number | string) => Number(amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    date = (date: string) => Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    }).format(new Date(date));

    fullDate = (date: string) => Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: '2-digit',
    }).format(new Date(date));

    monthAndYear = (date: string) => Intl.DateTimeFormat('pt-BR', {
        month: 'long',
        year: '2-digit',
    }).format(new Date(date));
}

export default new Formatter();