// Queue with two stacks.

// Implement a queue with two stacks so that each queue operations takes a
// constant amortized number of stack operations.

  // Answer:
    // assume Stack class uses array, and has push, pop, and contains methods

    // Queue definition
      // In = new Stack()
      // Out = new Stack()

      /* methods */
      // enqueue (accepts a value)
          // calls In's push method on value

      // dequeue
          // while pop value is defined
               // call In's pop method and save to a temp variable
              // call Out's push method w/ temp
          // call Out's pop method and return output

// Stack with max.

// Create a data structure that efficiently supports the stack operations (push and pop)
// and also a return-the-maximum operation. Assume the elements are reals numbers
// so that you can compare them.

  // Answer:
    // Stack definition
      // _storage = []
      // _largest = []

      /* methods */
      // push(val)
          // push val into _storage
          // if val is greater than or equal to top of _largest
             // push val onto _largest

      // pop(val)
           // if top of _largest matches top of _storage
             // pop item from _largest
           // pop and return top item from _storage

      // returnMax
          // return top item from _largest

// Assignment

  /*
  Dequeue.
  A double-ended queue or deque (pronounced "deck") is a generalization
  of a stack and a queue that supports adding and removing items from either the
  front or the back of the data structure. Create a generic data type Deque that
  implements the following API:

  public class Deque<Item> implements Iterable<Item> {
     public Deque()                           // construct an empty deque
     public boolean isEmpty()                 // is the deque empty?
     public int size()                        // return the number of items on the deque
     public void addFirst(Item item)          // add the item to the front
     public void addLast(Item item)           // add the item to the end
     public Item removeFirst()                // remove and return the item from the front
     public Item removeLast()                 // remove and return the item from the end
     public Iterator<Item> iterator()         // return an iterator over items in order from front to end
     public static void main(String[] args)   // unit testing
  }

  Corner cases.
  Throw a java.lang.NullPointerException if the client attempts to add a null
  item; throw a java.util.NoSuchElementException if the client attempts to
  remove an item from an empty deque; throw a
  java.lang.UnsupportedOperationException if the client calls the remove()
  method in the iterator; throw a java.util.NoSuchElementException if the
  client calls the next() method in the iterator and there are no more items to
  return.

  Performance requirements.
  Your deque implementation must support each deque operation in constant worst-case
  time. A deque containing n items must use at most 48n + 192 bytes of memory.
  and use space proportional to the number of items currently in the deque.
  Additionally, your iterator implementation must support each operation
  (including construction) in constant worst-case time.
  */

  class DequeNode {
    constructor(val) {
      if (val === null) {
        throw Exception;
      }
      this.value = val;
      this.prev = null;
      this.next = null;
    }

    hasNext() {
      return this.next !== null;
    }

    remove() {
      this.prev.next = this.next;
      this.next.prev = this.prev;
      this.next = null;
      this.prev = null;
    }

  }

  class Deque {
    constructor(){
      this.head = null;
      this.tail = null;
      this.size = 0;
    }

    isEmpty(){
      return size === 0;
    }

    size() {
      return this.size;
    }

    addFirst(val) {
      // create new node
      let node = new DequeNode(val);

      // if deque is empty
      if (this.head === null) {
        this.head = node;
        this.tail = node;

      // if deque is not empty
      } else {
        let temp = this.head;
        this.head = node;
        this.head.next = temp;
        this.head.prev = null;
        this.temp.prev = this.head;
      }
      this.size++;
    }

    addLast(val) {
      // create new node
      let node = new DequeNode(val);
      // if deque is empty
      if (this.tail === null){
        this.tail = node;
        this.head = node;

      // if deque is not empty
      } else {
        let temp = this.tail;
        this.tail = node;
        this.tail.next = null;
        this.tail.prev = temp;
        this.temp.next = this.tail;
      }
      this.size++
    }

    removeFirst() {
      // if deque is empty
      if (this.head === null) {
        throw Exception;

      // if deque is not empty
      } else {
        let temp = this.head;

        // one node in deque
        if (temp.next ===  null) {
          this.head = null;
          this.tail = null;

        // more than one node in deque
        } else {
          this.head = temp.next;
          this.head.prev = null;
          temp.next = null;
        }
        this.size--;
        return temp;
      }
    }

    removeLast() {
      // if deque is empty
      if (this.tail === null) {
        throw Exception;

      // if deque is not empty
      } else {
        let temp = this.tail;

        // one node in deque
        if (temp.prev === null) {
          this.tail = null;
          this.head = null;
        // more than one node in deque
        } else {
          this.tail = temp.prev;
          this.tail.next = null;
          temp.prev = null;
        }
        this.size--;
        return temp;
      }
    }

    iterate(callback){
      // if no callback is passed in, log value to console
      callback = callback || function(val) {
        console.log(val);
      }

      let current = this.head;
      while ( current.hasNext() ) {

        // call callback on value
        callback(current.value);
        current = current.next;
      }

      return;
    }

  }

/*
  Randomized queue.
  A randomized queue is similar to a stack or queue, except that the item removed
  is chosen uniformly at random from items in the data structure. Create a generic
  data type RandomizedQueue that implements the following API:

  public class RandomizedQueue<Item> implements Iterable<Item> {
     public RandomizedQueue()                 // construct an empty randomized queue
     public boolean isEmpty()                 // is the queue empty?
     public int size()                        // return the number of items on the queue
     public void enqueue(Item item)           // add the item
     public Item dequeue()                    // remove and return a random item
     public Item sample()                     // return (but do not remove) a random item
     public Iterator<Item> iterator()         // return an independent iterator over items in random order
     public static void main(String[] args)   // unit testing
  }
  Corner cases.
  The order of two or more iterators to the same randomized queue must be
  mutually independent; each iterator must maintain its own random order. Throw
  a java.lang.NullPointerException if the client attempts to add a null item;
  throw a java.util.NoSuchElementException if the client attempts to sample or
  dequeue an item from an empty randomized queue; throw a
  java.lang.UnsupportedOperationException if the client calls the remove()
  method in the iterator; throw a java.util.NoSuchElementException if the client
  calls the next() method in the iterator and there are no more items to return.

  Performance requirements.
  Your randomized queue implementation must support each randomized queue
  operation (besides creating an iterator) in constant amortized time. That is,
  any sequence of m randomized queue operations (starting from an empty queue)
  should take at most cm steps in the worst case, for some constant c. A
  randomized queue containing n items must use at most 48n + 192 bytes of memory.
  Additionally, your iterator implementation must support operations next() and
  hasNext() in constant worst-case time; and construction in linear time; you
  may (and will need to) use a linear amount of extra memory per iterator.
 */

class RandomizedQueue {
  constructor() {
    this.queue = [];
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }

  enqueue(val) {
    this.queue.push(val);
  }

  dequeue() {
    if (this.isEmpty()) {
      throw Exception;
      return;
    }
    let randomIdx = Math.random * this.queue.length,
      randomItem = this.queue[randomIdx]
      lastItem = this.queue[this.queue.length - 1];

    this.queue[randomIdx] = lastItem;
    this.queue[this.queue.length - 1] = randomItem;
    return this.queue.pop();
  }

  sample() {
    let randomIdx = Math.random * this.queue.length;
    return this.queue[randomIdx];
  }

  iterate(callback) {
    // iterates over queue in random order -> shuffle queue then loop over it?

    let newQueue = this.queue.slice(); // copy array (linear)

    // shuffle newQueue (linear)
    newQueue.forEach(function(item, currentIdx) {
      let temp = item,
        randomIdx = Math.random * newQueue.length;
      newQueue[currentIdx] = newQueue[randomIdx];
      newQueue[randomIdx] = temp;
    });

    // apply callback to each item (linear)
    newQueue.forEach(function(item) {
      callback(item);
    });

    return newQueue;
  }

}


/*
  Subset client.
  Write a client program Subset.java that takes a command-line integer k; reads in
  a sequence of N strings from standard input using StdIn.readString(); and prints
  out exactly k of them, uniformly at random. Each item from the sequence can be
  printed out at most once. You may assume that 0 ≤ k ≤ n, where n is the number
  of string on standard input.

  % echo A B C D E F G H I | java Subset 3       % echo AA BB BB BB BB BB CC CC | java Subset 8
  C                                              BB
  G                                              AA
  A                                              BB
                                                 CC
  % echo A B C D E F G H I | java Subset 3       BB
  E                                              BB
  F                                              CC
  G                                              BB

  The running time of Subset must be linear in the size of the input. You may use
  only a constant amount of memory plus either one Deque or RandomizedQueue object
  of maximum size at most n, where n is the number of strings on standard input.
  (For an extra challenge, use only one Deque or RandomizedQueue object of maximum
  size at most k.)
 */

 class Subset {
   constructor(k, input) {
     this.printNum = k;
     this.stringList = new RandomizedQueue();
     input.forEach(function(val) {
       this.stringList.enqueue(val);
     });
   }

   main() {
     let i = 0;
     while (i <= k) {
       console.log(this.stringList.dequeue());
       i++;
     }
     return;
   }

 }
