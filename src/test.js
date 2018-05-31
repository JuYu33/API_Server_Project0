/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
  if(!head){return head};
  
  var myList = new ListNode();
  myList.next = head;
  var currVal = myList;
  var nextVal = currVal.next;
  
  while(nextVal) {
      if(nextVal.val === val) {
          currVal.next = nextVal.next
      } else {
          currVal = currVal.next
      }
      nextVal = nextVal.next
  }
  
  return myList.next;
};