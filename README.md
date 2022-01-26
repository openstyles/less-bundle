less-bundle
===========

Bundle less css compiler into a single dist that could be used in web workers. You can find the output under the `dist` folder.

Demo
----

[live REPL](https://rawgit.com/openstyles/less-bundle/master/demo/)

Usage
-----

```js
less.render(code)
  .then(result => {
    console.log(result.css);
  });
```

Changelog
---------

* 0.2.1 (Jan 26, 2022)

  - Fix: move @rollup/plugin-json to dev-dependency.

* 0.2.0 (Jan 26, 2022)

  - Bump less to 3f05b5c (4.1.2+)

* 0.1.0 (Oct 2, 2018)

  - Initial release.
