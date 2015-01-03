Iron Router Query Array
==============================

An addon package for Iron Router that allows easy control of query string arrays.

## Installation

```sh
$ meteor add dburles:iron-router-query-array
```

## API

### add(name, value);

```js
Router.query.add('foo', 1);
// http://example.com/?foo[]=1
Router.query.add('foo', 2);
// http://example.com/?foo[]=1&foo[]=2
```

### remove(name, value);

```js
Router.query.remove('foo', 1);
// http://example.com/?foo[]=2
```

### isSet(name, value);

```js
Router.query.isSet('foo', 2);
// true
```

### clear();

```js
Router.query.clear();
// http://example.com/
```

## Example Application

Demo: http://query-array-demo.meteor.com

Source: https://github.com/dburles/query-array-demo

### License

MIT
