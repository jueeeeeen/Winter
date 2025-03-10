def generate_users():
    for user in users.keys():
        print(f"""new UserModel
    {{
        Username = "{user}",
        Email = "{user}@gmail.com",
        PasswordHash = HashPassword("1"),
        FirstName = "{users[user].split(" ")[0]}",
        LastName = "{users[user].split(" ")[1]}", 
        DateOfBirth = DateOnly.FromDateTime(DateTime.Parse("{random_datetime()}")),
        Gender = "{randome_gender()}"
    }},""")