# 15-Hands-on-with-Spawn-and-Fork
## Instructions

* create a repo (name it whatever you want)**
* setup the repo as usual
* write two sets of node programs (i.e. two sets of `parent.js` and `child.js)`
* The first set will use `spawn()`, the second set will use `fork()`
* In both sets …

  * you need a file with some content (I don’t care if you create a new one or use an existing one)
  * the parent will …

    * generate a public/private key pair
    * spawn/fork a child
    * send the public key and the file to the child (I don’t care how .. figure out the most efficient way for the `spawn()` and `fork()` versions)
    * receive the encrypted file from the child (again I don’t care how .. figure out the most efficient way for the `spawn()` and `fork()` versions)
    * verify the encrypted file is actually the original file (again I don’t care how … get creative)

  * the child will …

    * receive the public key and file
    * encrypt the file using the public key
    * return the encrypted file to the parent

  * include as much error handling as you can
  * show how much time it took to execute for each version
  * show how much memory was consumed by each version



 #### Note

The instructions are INTENTIONALLY vague. The idea is to make you think. If you need to feel free to send me DMs to ask me questions. I’ll be monitoring Slack.

Each of you will need to explain your code tomorrow (at our 10:30am meeting)  in front of the group. Come prepared.

> Any time I say “whatever you want” it means give it a meaningful name or I will judge you
