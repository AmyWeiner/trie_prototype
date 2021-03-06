Trie = function(){
  this.characters = {};
  this.isWord = false;
};

Trie.prototype.learn = function(word, index){
  // This function should add the given word,
  // starting from the given index,
  // to this Trie.

  // It will be recursive.  It will tell
  // the correct child of this Trie to learn the word
  // starting from a later index.

  // Consider what the learn function should do
  // when it reaches the end of the word?
  // A word does not necessarily end at a leaf.
  // You must mark nodes which are the ends of words,
  // so that the words can be reconstructed later.
  var substring = "";
  if (typeof index == "undefined") {
    index = 0;
  }

  substring = word[index];
  if (typeof this.characters[substring] == "undefined") {
    this.characters[substring] = new Trie();
  }

  if ((word.length - 1) == index) {
    this.characters[substring].isWord = true;
    return;
  } else {
    index ++;
    this.learn.apply(this.characters[substring], [word, index]);
  }
};

Trie.prototype.getWords = function(words, currentWord){
  // This function will return all the words which are
  // contained in this Trie.
  // it will use currentWord as a prefix,
  // since a Trie doesn't know about its parents.
  if (typeof words == "undefined") {
    words = [];
  }

  if (typeof currentWord == "undefined") {
    currentWord = "";
  }

  var node = this;
  if (node.isWord) {
    words.push(currentWord);
  }

  for (var character in node.characters) {
    if (node.characters.hasOwnProperty(character)) {
      this.getWords.apply(node.characters[character], [words, currentWord + character]);
    }
  }
  return words;
};

Trie.prototype.find = function(word, index){
  // This function will return the node in the trie
  // which corresponds to the end of the passed in word.

  // Be sure to consider what happens if the word is not in this Trie.
  var substring = "";
  if (typeof index == "undefined") {
    index = 0;
  }

  substring = word[index];
  if (typeof this.characters[substring] == "undefined") {
    return this.characters[substring];
  }

  if ((word.length - 1) == index) {
    return this.characters[substring];
  } else {
    index ++;
    return this.find.apply(this.characters[substring], [word, index]);
  }
};

Trie.prototype.autoComplete = function(prefix){
  // This function will return all completions 
  // for a given prefix.
  // It should use find and getWords.
  var foundNode = this.find(prefix);
  if (typeof foundNode == "undefined") {
    return [];
  }
  var words = foundNode.getWords();
  for (var i = 0; i < words.length; i ++) {
    words[i] = prefix + words[i];
  }
  return words;
};









