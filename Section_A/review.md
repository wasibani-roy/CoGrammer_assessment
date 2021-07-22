---
date: "2021-07-22"
Author: "Wasibani Roy"
---
# review of submitted code sample

The way you are defining a class is not accurate. In python when defining a class we use the keyword **class** and example will look something like below

```
class SMSObject(Object):
```
That should be your first line. Next you hit enter that will automatically indent the cursor point. Any thing added will following the Indent will be part of the class.

For read ability of the code we can have each of our class variables defined on a new line. You also need to take into consideration the use of instance variables vs class variables i would advise doing away with line 2 of your code and sticking with class variables

Line 8 in the function markAsRead 

```
if userChoice == read:
```
you need to define a variable inside the class to which you pass userChoice inorder to avoid a NameError for example

```
class SMSObject():
    def __init__(self, a,b,c):
        self.a = a
        self.b = b
        self.c = c
        self.choice = userChoice
    def mark_as_read(self):
        if self.choice == "read":
            self.a = True
```

Then in your code  you need to ensure userChoice is defined before the class is instantiated

To call any method defined with in the class you call the created object followed by **.** operator and the name of the class

```
no_2.mark_as_read()
```