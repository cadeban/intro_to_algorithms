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
    //
