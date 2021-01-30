# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Homework.Repo.insert!(%Homework.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Homework.Merchants.Merchant
alias Homework.Users.User
alias Homework.Transactions.Transaction

merchants = [
  %{
    id: "11111111-1111-1111-1111-111111111111",
    description: "We like money",
    name: "Divvy"
  },
  %{
    id: "11111111-1111-1111-1111-111111111112",
    description: "We like cars",
    name: "DealerSocket"
  },
  %{
    id: "11111111-1111-1111-1111-111111111113",
    description: "We like cool stuff",
    name: "Cool Merchant"
  }
]

users = [
  %{
    id: "21111111-1111-1111-1111-111111111111",
    dob: "09/08/1230",
    first_name: "Davy",
    last_name: "Jones"
  },
  %{
    id: "31111111-1111-1111-1111-111111111111",
    dob: "07/31/1600",
    first_name: "Jack",
    last_name: "Sparrow"
  },
  %{
    id: "41111111-1111-1111-1111-111111111111",
    dob: "07/31/1980",
    first_name: "Harry",
    last_name: "Potter"
  }
]

transactions = [
  %{
    id: "11111111-2111-1111-1111-111111111111",
    amount: 100,
    credit: false,
    debit: true,
    description: "Some stuff",
    merchant_id: "11111111-1111-1111-1111-111111111111",
    user_id: "21111111-1111-1111-1111-111111111111"
  },
  %{
    id: "11111111-3111-1111-1111-111111111111",
    amount: 200,
    credit: false,
    debit: true,
    description: "More stuff",
    merchant_id: "11111111-1111-1111-1111-111111111112",
    user_id: "31111111-1111-1111-1111-111111111111"
  },
  %{
    id: "11111111-4111-1111-1111-111111111111",
    amount: 300,
    credit: true,
    debit: false,
    description: "Extra stuff",
    merchant_id: "11111111-1111-1111-1111-111111111113",
    user_id: "41111111-1111-1111-1111-111111111111"
  }
]

Enum.each(merchants, fn(data) ->
  Homework.Repo.insert!(%Merchant{
    id: data.id,
    description: data.description,
    name: data.name
  },
  on_conflict: :nothing)
end)

Enum.each(users, fn(data) ->
  Homework.Repo.insert!(%User{
    id: data.id,
    dob: data.dob,
    first_name: data.first_name,
    last_name: data.last_name
  },
  on_conflict: :nothing)
end)

Enum.each(transactions, fn(data) ->
  Homework.Repo.insert!(%Transaction{
    id: data.id,
    amount: data.amount,
    credit: data.credit,
    debit: data.debit,
    description: data.description,
    merchant_id: data.merchant_id,
    user_id: data.user_id
  },
  on_conflict: :nothing)
end)