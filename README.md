# Singleton

Singleton decorator. No constructor monkey patching. Built with TypeScript. With **Angular DI compatibility**.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Quick start](#quick-start)
- [Usage without decorators](#usage-without-decorators)
- [Inheritance](#inheritance)
- [In depth](#in-depth)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

1.  Just copy singleton-decorator.ts into your project.
2.  Add `import 'reflect-metadata';` to your polyfill.ts

## Quick start

```ts
@Singleton
class Test {}

new Test() === new Test() // returns `true`

@Singleton
@Injectable()
export class SomeService {}
```

## Usage without decorators

```ts
class Test {}
const TestSingleton = Singleton(Test)

new TestSingleton() === new TestSingleton() // returns `true`
```

## Inheritance

Any child of your singleton will not be a singleton.

```ts
@Singleton
class Parent {}

class Child extends Parent {}

new Child() === new Child() // returns `false`

// If you want to make `Child` a singleton as well, apply `singleton` decorator directly to it
@Singleton
class ChildSingleton extends Parent {}

new ChildSingleton() === new ChildSingleton() // returns `true`
```

## In depth

`singleton` decorator wraps your class with a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) and a [construct trap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/construct) to override class' creation logic.

Your singleton instance is always available as a static property of a class by key `SINGLETON_KEY`.

```ts
@Singleton
class Test {}

const instance = new Test()
Test[SINGLETON_KEY] === instance // returns `true`
```
