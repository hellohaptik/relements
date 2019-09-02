# Relements

[![Build Status](https://travis-ci.com/hellohaptik/relements.svg?token=rergqhB6eJSbetzoHGCs&branch=master)](https://travis-ci.com/hellohaptik/relements) [![codecov](https://codecov.io/gh/hellohaptik/relements/branch/master/graph/badge.svg?token=eqHpHxVoaa)](https://codecov.io/gh/hellohaptik/relements)


Relements are a set of highly reusable components. They can be used to build highly customizable and interactive applications and user interfaces.

## Highlights

Built from the ground up with zero dependencies. This lightweight component library helps you focus more on your business logic and less on reinventing the wheel.

- Highly customizable. Each and every layer and element can styled using the CSS framework/library of your choice.
- Focused on performance. Each component is individually importable, and developed using strict performance benchmarks.
- Documentation Storybook. Plenty of usage examples and easy integration let's you get started quickly.

# Installation

## Prerequisites

This library heavily uses React Hooks. It needs the following versions of `react` and `react-dom`

```
"react": "~16.8.6",
"react-dom": "~16.8.6",
```

---

## Using npm or yarn

We recommend using npm or yarn to install relements. It makes the installation process much more streamlined.

```
npm install relements --save
```

```
yarn add relements
```

---

## Import directly in browser

You can import relements directly using a `script` tag. You can download or link these files directly using a CDN.

```
<script src="cdn.hellohaptik.com/relements/1.0.0/dist.js">
```

> We strongly discourage this method as it includes all the components regardless of usage. It also becomes more difficult to keep the library up to date. Consider using this library with Webpack/Rollup instead.

# Usage

Relements elements are all self contained elements with their own styles. When used in conjunction with Webpack, they can individually imported and used.

We provide an optional `Provider` element to provide some basic theme options such as `primaryColor` etc.

## Using elements

All the elements can be individually imported and used.

```
import React from 'react'
import Button from 'relements/UI/Button'

function App() {
  return <Button type={Button.TYPES.PRIMARY}> Hello, World! </Button>
}
```

#### Output

<CodeBlock>
  <Button type={Button.TYPES.PRIMARY}> Hello, World! </Button>
</CodeBlock>

---

## Using the Provider

The Provider must wrap your application at the root level. It provides the components with some configuration data using the React Context API.

```
import React from 'react'
import Provider from 'relements/core/Provider'

function App() {
  return (
    <Provider config={{ primaryColor: '#F00000' }}>
      <MyApp/>
    </Provider>
  )
}
```

#### Configuration Options
