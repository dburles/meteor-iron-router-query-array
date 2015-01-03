Tinytest.add("Iron Router Query Array - add", function(test) {
  // empty query string
  var query1 = Router.query._add({}, 'foo', 'bar');
  test.equal(query1, { foo: ['bar'] });

  // query string with string param
  var query2 = Router.query._add({ foo: 'bar' }, 'baz', 'qux');
  test.equal(query2, { foo: 'bar', baz: ['qux'] });

  // try add to a string param
  // XXX what should be the correct behavior here?
  //     it will depend on how IR ultimately handles query strings/arrays
  //     so for now we'll throw an error
  test.throws(function() {
    Router.query._add({ foo: 'bar' }, 'foo', 'qux');
  }, 'already exists');

  // add to existing array
  var query3 = Router.query._add({ foo: ['bar'] }, 'foo', 'baz');
  test.equal(query3, { foo: ['bar', 'baz'] });
});

Tinytest.add("Iron Router Query Array - remove", function(test) {
  // basic remove
  var query1 = Router.query._remove({ foo: ['bar'] }, 'foo', 'bar');
  test.equal(query1, {});

  var query2 = Router.query._remove({ foo: ['bar'] }, 'foo', 'baz');
  test.equal(query2, { foo: ['bar'] });

  // empty query string
  test.throws(function() {
    Router.query._remove({}, 'foo', 'bar');
  }, 'does not exist');

  // existing string param
  test.throws(function() {
    Router.query._remove({ foo: 'bar' }, 'foo', 'bar');
  }, 'already exists');
});

Tinytest.add("Iron Router Query Array - isSet", function(test) {
  var query1 = Router.query._isSet({ foo: ['bar'] }, 'foo', 'bar');
  test.equal(query1, true);

  var query2 = Router.query._isSet({ foo: ['bar'] }, 'foo', 'baz');
  test.equal(query2, false);

  var query3 = Router.query._isSet({ foo: ['bar'] }, 'bar', 'baz');
  test.equal(query3, false);

  var query4 = Router.query._isSet({}, 'foo', 'bar');
  test.equal(query4, false);

  var query5 = Router.query._isSet({ foo: 'bar' }, 'foo', 'bar');
  test.equal(query5, false);
});

Tinytest.add("Iron Router Query Array - clear", function(test) {
  test.equal(Router.query._clear(), {});
});