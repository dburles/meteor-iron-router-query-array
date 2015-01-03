var go = function(query) {
  Router.go(Router.current().route.getName(), Router.current().params, {
    query: query,
    hash: Router.current().params.hash
  });
};

Router.query = {
  _add: function(query, name, value) {
    if (! query[name])
      query[name] = [value];
    else {
      if (! _.isArray(query[name]))
        throw new Meteor.Error("Router.query.add: param `" + name + "` already exists and is not an array");
        // or turn it into an array? (see tests)
        // query[name] = [query[name]];

      if (_.indexOf(query[name], value) === -1)
        query[name].push(value);
    }
    return query;
  },
  _isSet: function(query, name, value) {
    return !! (query[name] && _.indexOf(query[name], value) !== -1);
  },
  _remove: function(query, name, value) {
    if (! _.has(query, name))
      throw new Meteor.Error("Router.query.remove: param `" + name + "` does not exist");
    if (! _.isArray(query[name]))
      throw new Meteor.Error("Router.query.remove: param `" + name + "` already exists and is not an array");

    // remove the property if `value` is the last element in the array
    if (query[name].length === 1 && query[name][0] === value)
      delete query[name];
    else
      query[name] = _.without(query[name], value);

    return query;
  },
  _clear: function() {
    return {};
  },

  add: function(name, value) {
    var query = EJSON.clone(Router.current().params.query);
    var newQuery = this._add(query, name, value);
    go(newQuery);
  },
  remove: function(name, value) {
    var query = EJSON.clone(Router.current().params.query);
    var newQuery = this._remove(query, name, value);
    go(newQuery);
  },
  isSet: function(name, value) {
    var query = Router.current().params.query;
    return this._isSet(query, name, value);
  },
  clear: function() {
    go(this._clear());
  }
};
