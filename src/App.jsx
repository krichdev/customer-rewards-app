import { useState, useEffect, useMemo } from "react";
import transactionsData from "../customer_transactions.json";
import "./App.css";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const calculatePoints = (amount) => {
    if (amount <= 50) return 0;
    const overHundred = amount > 100 ? (amount - 100) * 2 : 0;
    const fiftyToHundred = Math.min(amount, 100) - 50;
    return overHundred + fiftyToHundred;
  };

  const getMonthYearString = (dateString) => {
    /*
        Had to look this up - a transaction was generated with 01/01/2023 as the date
        which was being grouped as December 2022. Added TZ to convert to UTC format
        Most likely, assuming the timestamp on transactions would be in UTC format from a
        production DB.
    */
    const date = new Date(dateString + "T00:00:00Z");
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();

    return `${monthNames[month]} ${year}`;
  };

  const fetchTransactions = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(transactionsData);
      }, 1000);
    });
  };

  useEffect(() => {
    async function fetchData() {
      const data = await fetchTransactions();
      setTransactions(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const transactionsByCustomer = useMemo(() => {
    const groupedTransactions = {};

    transactions.forEach(({ customerId, amount, date, transactionId }) => {
      const month = getMonthYearString(date);
      const points = calculatePoints(amount);

      if (!groupedTransactions[customerId]) {
        groupedTransactions[customerId] = { transactions: {}, totalPoints: 0 };
      }
      if (!groupedTransactions[customerId].transactions[month]) {
        groupedTransactions[customerId].transactions[month] = {
          transactionDetails: [],
          monthlyPoints: 0,
        };
      }

      groupedTransactions[customerId].transactions[
        month
      ].transactionDetails.push({ amount, date, transactionId });
      groupedTransactions[customerId].transactions[month].monthlyPoints +=
        points;
      groupedTransactions[customerId].totalPoints += points;
    });

    return groupedTransactions;
  }, [transactions]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-5">Customer Rewards</h1>
      {Object.entries(transactionsByCustomer).map(([customerId, data]) => (
        <div
          key={customerId}
          className="mb-6 p-4 border border-gray-200 rounded shadow-sm"
        >
          <h3 className="font-bold text-lg mb-3">Customer ID: {customerId}</h3>
          <p className="font-bold">Total Points: {data.totalPoints}</p>
          {Object.entries(data.transactions).map(
            ([month, { transactionDetails, monthlyPoints }], index) => (
              <div key={`${customerId}-${month}-${index}`} className="mb-4">
                <h4 className="font-semibold text-md mb-2">
                  {month} (Points: {monthlyPoints})
                </h4>
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Date
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionDetails.map(
                      ({ date, amount, transactionId }) => (
                        <tr
                          key={transactionId}
                          className="border-b border-gray-300"
                        >
                          <td className="px-4 py-2">{date}</td>
                          <td className="px-4 py-2">${amount}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
