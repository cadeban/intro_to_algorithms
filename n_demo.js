function Stack() {
  this._store = [];
  this._id = ++this.constructor._id;
  this._counts = {
    pop: 0,
    push: 0,
  };
}

Stack._id = 0;

Stack.prototype.pop = function pop() {
  this._counts.pop++;
  return this._store.pop();
};

Stack.prototype.push = function push(x) {
  this._counts.push++;
  this._store.push(x);
  return this;
};

Stack.prototype.toString = function() {
  return "\nStack<" +
    this._id +
    "> {\n  push: " +
    this._counts.push +
    ",\n  pop: " +
    this._counts.pop +
    "\n}\n";
};

Stack.prototype.len = function() {
  return this._store.length;
};

function Queue() {
  this._id = ++this.constructor._id;
  this._a = new Stack();
  this._b = new Stack();
  this._count = {
    enqueue: 0,
    dequeue: 0,
  };
}

Queue._id = 0;

Queue.prototype.enqueue = function(x) {
  this._count.enqueue++;
  this._a.push(x);
  return this;
};

Queue.prototype.dequeue = function() {
  this._count.dequeue++;
  if (!this._b.len()) {
    while (this._a.len()) {
      this._b.push(this._a.pop());
    }
  }
  return this._b.pop();
};

Queue.prototype.toString = function() {
  return "\nQueue<" +
    this._id +
    "> {\n\n  [" +
    this._printStore() +
    "]\n  " +
    this._printStack(this._a) +
    ",\n  " +
    this._printStack(this._b) +
    "\n}\n";
};

Queue.prototype._printStore = function() {
  return this._b._store.slice(0)
    .reverse()
    .concat(this._a._store)
    .join(', ');
};

Queue.prototype._printStack = function(stack) {
  return stack.toString().split("\n").join("\n  ");
};

Queue.prototype.log = function() {
  console.log(this + '');
};

module.exports = Queue;
