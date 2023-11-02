# Currency converter backend

Since the frontend cannot get from the CNB API directly, this backend is used as a proxy to get the data and send it to
the frontend.

Also maps the response from CNB into a standardized format to allow for pluggability (like in the case where we want to
use a different exchange rate API)

## Installation

- Copy `.env.example` into `.env` and change the variables. You'll find descriptions for what the variables do
in `.env.example`
- Run the dev server with `npm run dev`
