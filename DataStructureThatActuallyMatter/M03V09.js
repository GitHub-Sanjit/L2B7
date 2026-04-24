class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const newNode = new Node(value);

    // If the linked list is empty
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // If the linked list is not empty
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;

    return this;
  }

  prepend(value) {
    const newNode = new Node(value);

    // If the linked list is empty
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // if the linked list is not empty
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;

    return this;
  }

  insert(index, value) {
    if (index < 0 || index > this.length) {
      console.error("Index out of bound: Shohoj Bangla Bashahy muri khaaa");
      return undefined;
    }

    // if the insert is in the start of the linked list
    if (index === 0) {
      return this.prepend(value);
    }

    // if the insert is in the end of the list
    if (index === this.length) {
      return this.append(value);
    }

    // if the insert is in the middle

    // find the leading node

    const leadingNode = this._traverseToIndex(index - 1);
    const holdingNode = leadingNode.next;

    const newNode = new Node(value);

    leadingNode.next = newNode;
    newNode.next = holdingNode;

    this.length++;
  }

  remove() {}

  // privet helper method
  _traverseToIndex(index) {
    let count = 0;
    let currentNode = this.head;

    while (count !== index) {
      currentNode = currentNode.next;
      count++;
    }

    return currentNode;
  }

  print() {
    const arr = [];
    let currentNode = this.head;

    while (currentNode !== null) {
      arr.push(currentNode.value);
      currentNode = currentNode.next;
    }

    console.log(arr.join(" -> "), "-> null ");
  }
}

const linkedList = new LinkedList();

linkedList.append("A"); //* 0

linkedList.print();

linkedList.remove(0);

linkedList.print();