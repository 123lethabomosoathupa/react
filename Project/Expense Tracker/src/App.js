import React, { useState } from 'react';
import { Trash2, Edit2, Check, X, DollarSign, TrendingDown, Wallet } from 'lucide-react';
import './App.css';

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [salary, setSalary] = useState('');
  const [savedSalary, setSavedSalary] = useState(0);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [editingId, setEditingId] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editCategory, setEditCategory] = useState('');

  const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Other'];

  const saveSalary = () => {
    if (salary) {
      setSavedSalary(parseFloat(salary));
    }
  };

  const addExpense = () => {
    if (!description || !amount) return;

    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category
    };

    setExpenses([newExpense, ...expenses]);
    setDescription('');
    setAmount('');
    setCategory('Food');
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const startEdit = (expense) => {
    setEditingId(expense.id);
    setEditDescription(expense.description);
    setEditAmount(expense.amount.toString());
    setEditCategory(expense.category);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDescription('');
    setEditAmount('');
    setEditCategory('');
  };

  const saveEdit = (id) => {
    if (!editDescription || !editAmount) return;

    setExpenses(expenses.map(exp => 
      exp.id === id 
        ? { ...exp, description: editDescription, amount: parseFloat(editAmount), category: editCategory }
        : exp
    ));
    setEditingId(null);
    setEditDescription('');
    setEditAmount('');
    setEditCategory('');
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const disposableIncome = savedSalary - totalExpenses;

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <h1 className="app-title">Expense Tracker (ZAR)</h1>

        {/* Salary Input */}
        <div className="card">
          <h2 className="section-title">Monthly Salary</h2>
          <div className="salary-input-group">
            <input
              type="number"
              step="0.01"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="input-field"
              placeholder="Enter your monthly salary"
            />
            <button onClick={saveSalary} className="btn-primary">
              Set Salary
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-icon salary-icon">
              <Wallet size={24} />
            </div>
            <div className="summary-content">
              <p className="summary-label">Monthly Salary</p>
              <p className="summary-value">R{savedSalary.toFixed(2)}</p>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon expense-icon">
              <TrendingDown size={24} />
            </div>
            <div className="summary-content">
              <p className="summary-label">Total Expenses</p>
              <p className="summary-value">R{totalExpenses.toFixed(2)}</p>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon disposable-icon">
              <DollarSign size={24} />
            </div>
            <div className="summary-content">
              <p className="summary-label">Disposable Income</p>
              <p className={`summary-value ${disposableIncome < 0 ? 'negative' : ''}`}>
                R{disposableIncome.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Add Expense */}
        <div className="card">
          <h2 className="section-title">Add New Expense</h2>
          <div className="input-group">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field"
              placeholder="Description"
            />
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-field"
              placeholder="Amount"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button onClick={addExpense} className="btn-primary">
              Add Expense
            </button>
          </div>
        </div>

        {/* Expenses List */}
        <div className="card">
          <h2 className="section-title">Expenses</h2>
          <div className="expense-list">
            {expenses.length === 0 ? (
              <p className="empty-state">No expenses yet</p>
            ) : (
              expenses.map(expense => (
                <div key={expense.id} className="expense-item">
                  {editingId === expense.id ? (
                    <>
                      <div className="edit-inputs">
                        <input
                          type="text"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="input-field-small"
                          placeholder="Description"
                        />
                        <input
                          type="number"
                          step="0.01"
                          value={editAmount}
                          onChange={(e) => setEditAmount(e.target.value)}
                          className="input-field-small"
                          placeholder="Amount"
                        />
                        <select
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value)}
                          className="input-field-small"
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div className="expense-right">
                        <button onClick={() => saveEdit(expense.id)} className="btn-icon btn-save">
                          <Check size={18} />
                        </button>
                        <button onClick={cancelEdit} className="btn-icon btn-cancel">
                          <X size={18} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="expense-info">
                        <span className="expense-description">{expense.description}</span>
                        <span className="expense-category">{expense.category}</span>
                      </div>
                      <div className="expense-right">
                        <span className="expense-amount">R{expense.amount.toFixed(2)}</span>
                        <button onClick={() => startEdit(expense)} className="btn-icon btn-edit">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => deleteExpense(expense.id)} className="btn-icon btn-delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}