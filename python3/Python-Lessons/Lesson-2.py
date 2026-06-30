x = 10
y = 3

print(x == y)   # equal to
print(x != y)   # not equal
print(x > y)    # greater than
print(x >= y)   # greater or equal

"""python uses words 'and' and 'or' for logical operations 
 instead of symbols like && or || in other languages"""
#%%
age = 25
has_id = True
if age >= 18 and has_id:
    print("Allowed in")

if age < 18 or not has_id:
    print("Not allowed")

#%%
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print(grade)


#this is considered a falsey value in python, so the code inside the if statement won't execute
if 0 or "" or None or [] or {} or False:
    print("won't print")


# %%
#python allows chaining of comparison operators
age = 25
if 18 <= age < 65:
    print("Working age")


status = "adult" if age >= 18 else "minor"



# Problem to be solved
"""Sets a variable temperature = 75
Prints "Hot" if temperature > 85, "Warm" if between 60-85 (inclusive), else "Cold" — using elif
Uses a ternary expression to set weather_status = "go outside" if temperature is between 60 and 85, else "stay in"""

#%%
temp = 86
weather = "go outside" if 60 <= temp <= 85 else "stay in"
if temp > 85:
    print("Hot")
    print(weather)
elif 60 <= temp <= 85:
    print("Warm")
    print(weather)

else:
    print("Cold")
    print(weather)

# %%
