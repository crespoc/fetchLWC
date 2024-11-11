import { LightningElement } from 'lwc';

export default class FetchApiCurrency extends LightningElement {
    fromCurrency;
    toCurrency;
    amount;
    URL = 'https://api.apilayer.com/fixer/convert?from=';
    convertedAmount;

    get options() {
        return [
            { label: 'US Dollar', value: 'USD' },
            { label: 'Great Britain Pound', value: 'GBP' },
            { label: 'Indian Rupee', value: 'INR' },
            { label: 'Australian Dollar', value: 'AUD' },
            { label: 'Canadian Dollar', value: 'CAD' },
            { label: 'China Yuan Renminbi', value: 'CNY' },
            { label: 'New Zealand Dollar', value: 'NZD' },
            { label: 'Brazilian Real', value: 'BRL' },
            { label: 'South African Rand', value: 'ZAR' },
            { label: 'Swedish Krona', value: 'SEK' },
            { label: 'Hong Kong Dollar', value: 'HKD' },
        ];
    }

    handleChange(event) {
        const { name, value } = event.target;
        if (name === 'fromCurrency') {
            this.fromCurrency = value;
        } else if (name === 'toCurrency') {
            this.toCurrency = value;
        } else if (name === 'amount') {
            this.amount = value;
        }
    }

    handleConvert() {
        const date = new Date();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const finalDate = `${date.getFullYear()}-${month}-${day}`;

        const finalEndpoint = `${this.URL}${this.fromCurrency}&to=${this.toCurrency}&amount=${this.amount}&date=${finalDate}`;
        console.log('---finalEndpoint---', finalEndpoint);

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'apikey': 'xxxxxxxxxxxxxxxxxxxxxxxxxxx'
            }
        };

        // Realizar la llamada con fetch
        fetch(finalEndpoint, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('---data---', data.result);
                this.convertedAmount = data.result;
            })
            .catch(error => {
                console.error('--- error occurred while fetching API---', error);
            });
    }
}
