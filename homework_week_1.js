/*
1. Social network connectivity.

  Given a social network containing n members and a log file containing m timestamps
  at which times pairs of members formed friendships,
  design an algorithm to determine the earliest time at which all members are connected
  (i.e., every member is a friend of a friend of a friend ... of a friend).
  Assume that the log file is sorted by timestamp and that friendship is an equivalence
  relation. The running time of your algorithm should be mlogn or better and use extra
  space proportional to n.

  Answer:
    // n = members, m = timestamps
    // create an instance of WeightedQuickUnion(n)
    // loop over the timestamps
        // join the friends, which increments size of larger tree
        // if size of larger root === n
           // return timestamp


2. Union-find with specific canonical element.

  Add a method 𝚏𝚒𝚗𝚍() to the union-find data type so that 𝚏𝚒𝚗𝚍(𝚒)
  returns the largest element in the connected component containing i.
  The operations, 𝚞𝚗𝚒𝚘𝚗(), 𝚌𝚘𝚗𝚗𝚎𝚌𝚝𝚎𝚍(), and 𝚏𝚒𝚗𝚍() should all take logarithmic time
  or better.

  For example, if one of the connected components is {1,2,6,9},
  then the 𝚏𝚒𝚗𝚍() method should return 9 for each of the four elements
  in the connected components.

  Answer:
     // modify connections array so that each index has a tuple:
     // [index, largestOfConnected(initialized with index)]
     // modify union
     // every time element attempts to join
         // compare root's of both element's  largestOfConnected
         // if larger root's largestOfConnected is smaller
               //update it with smaller root's largestOfConnected
     // have find return root's tuple's second element

3. Successor with delete.

  Given a set of N integers S={0,1,...,N−1} and a sequence of requests of the
  following form:

  Remove x from S
  Find the successor of x: the smallest y in S such that y≥x.
  design a data type so that all operations (except construction) should take logarithmic time or better.

  Answer:
    // modify union
    // every time element attempts to join
       // compare root's of both elements largestOfConnected
       // if larger root's largestOfConnected is smaller
           // update it with smaller root's largestOfConnected

*/

class QuickUnion {
  constructor(n) {
    this.array = [];
    this.size = [];
    for (let i = 0; i < n; i++) {
      this.array[i] = i;
      this.size[i] = 1;
    }
  }

  root(i) {
    while (i !== this.array[i]) { //index is not equal to current item
      this.array[i] = this.array[this.array[i]];
      i = this.array[i]; // set index to current item
    }
    return i;
  }

  connected(p, q) {
    return root(p) === root(q);
  }

  union(p, q) {
    const i = root(p);
    const j = root(q);
    if (i === j) {
      return;
    }
    if (this.size[i] < this.size[j]) {
      this.array[i] = j;
      this.size[i] += this.size[j];
    } else {
      this.array[j] = i;
      this.size[j] += this.size[i];
    }
  }

}

/*
  public class Percolation {
     public boolean isFull(int row, int col)  // is site (row, col) full?
  }
 */

class Percolation {
  constructor(n){
    this.n = n;
    this.grid = [];

    while (this.grid.length < n) {
      let temp = [];
      while (temp.length < n) {
        temp.push(0);
      }
      this.grid.push(temp);
    }

    this.connections = new QuickUnion((n * n) + 2);
  }

  open(row, col){
    this.grid[row][col] = 1;
    if (row === 0 || row === (this.n - 1)) {
      let connect = (row === 0) ? 35 : 36;
      this.connections.union(this.getIndex(row, col), connect);
    }
    this.neighbors(row, col);
  }

  isOpen(row, col) {
    return this.grid[row][col] === 1;
  }

  isFull(row, col) {
    // returns boolean
  }

  percolates() {
    return this.connections.connected(36, 37);
  }

  getCoords(index) {
    return [Math.floor(index / this.n), index % this.n];
  }

  getIndex(row, col) {
    return ((row * this.n) - 1) + ( col + 1 );
  }

  withinBounds(row, col) {
    return (row < 0 || col < 0 || row >= this.n || col >= this.n) ? false : true;
  }

  neighbors(row, col) {
    const directions = [[-1, 0], [0, 1], [0, -1], [1, 0]];

    for (let i = 0; i < directions.length; i++) {
      const neighborRow = row + directions[i][0];
      const neighborCol = col + directions[i][1];
      if (this.withinBounds(neighborRow, neighborCol)) {
        if ( this.isOpen(neighborRow, neighborCol) ) {
          const p = this.getIndex(row, col);
          const q = this.getIndex(neighborRow, neighborCol);
          this.connections.union(p, q);
        }
      }
    }

  }

}


/*
1. 3-SUM in quadratic time.
  Design an algorithm for the 3-SUM problem that takes time proportional to n2 in
  the worst case. You may assume that you can sort the n integers in time
  proportional to n2 or better.

  Answer:
    // sort array n
    // loop over array n, where i = current index
    // loop over array n, where j = i + 1
    // add array n[i] + array n[j] for currentTotal
    // currentTotal + x === 0
    // binary search for x

2. Search in a bitonic array.

  An array is bitonic if it is comprised of an increasing sequence of integers
  followed immediately by a decreasing sequence of integers. Write a program that,
  given a bitonic array of n distinct integer values, determines whether a
  given integer is in the array.

  Standard version: Use ∼3lgn compares in the worst case.
  Signing bonus: Use ∼2lgn compares in the worst case (and prove that no
  algorithm can guarantee to perform fewer than ∼2lgn compares in the worst case).
  Do it without finding the maximum integer.

  Answer:
    // bitonic array n (increasing seq of ints followed by decreasing seq of ints)
    // determines whether a given int is in an array
    // split array into two (n)? sort array (n)?
    // binary search for given int

3. Egg drop.

  Suppose that you have an n-story building (with floors 1 through n) and plenty
  of eggs. An egg breaks if it is dropped from floor T or higher and does not
  break otherwise. Your goal is to devise a strategy to determine the value of T
  given the following limitations on the number of eggs and tosses:

    Version 0: 1 egg, ≤T tosses.
    Version 1: ∼1lgn eggs and ∼1lgn tosses.
    Version 2: ∼lgT eggs and ∼2lgT tosses.
    Version 3: 2 eggs and ∼2n‾‾√ tosses.
    Version 4: 2 eggs and ≤cT‾‾√ tosses for some fixed constant c.

  Answer:
    // Sequential
    // Binary Search
    //
    //

  Their Answer:
  Version 0: sequential search.
  Version 1: binary search.
  Version 2: find an interval containing T of size ≤2T, then do binary search.
  Version 3: find an interval of size n‾‾√, then do sequential search. Note: can be improved to ∼2n‾‾‾√ tosses.
  Version 4: 1+2+3+…+t∼12t2. Aim for c=22‾‾√.
 */
