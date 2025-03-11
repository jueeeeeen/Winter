import random
from datetime import datetime, timedelta

users = {
    "jueeeeeen": "Emily :D",
    "mustmark": "Peerawat ingkhasantatikul",
    "laluearn": "Sataporn bubu",
    "Tham": "Thuwanan tham",
    "third": "Supakarn eiei",
    "Luffy": "Luffy ThePirate",
    "Hinata": "Hinata Shouyo",
    "rem": "remu themaido",
    "emilia": "emili tan",
    "kirito": "kiragaya kirito",
    "bob": "bob sponge",
    "alice": "alice meow"
}

tags = ["Art", "Beauty", "Entertain", "Food", "Hobby", "Pet", "Sport", "Study", "Travel"]

location = [
    "เกกี1",
    "เกกี2",
    "เกกี3",
    "เกกี4",
    "มีสมาย",
    "รางรถไฟ",
    "ECC",
    "โรงพระเทพ",
    "หอสมุด",
    "แอร์พอร์ตลิ้ง",
    "ตึกโหล",
    "ตี๋น้อย",
    "ชาบูปาร์ตี้",
    "laohu",
]

duration = [
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
]


def random_datetime(start_year=1994, end_year=2008):
    year = random.randint(start_year, end_year)
    month = random.randint(1, 12)
    day = random.randint(1, 28)

    hour = random.randint(0, 23)
    minute = random.randint(0, 59)

    birthdate = datetime(year, month, day, hour, minute)
    return birthdate.strftime("%Y-%m-%dT%H:%M")

def random_gender():
    return random.choice(["male", "female", "lgbtq"])

def random_gender_req():
    return random.choice(["male", "female", "lgbtq", "none"])

def random_age_req():
    return random.randint(16, 30)

def random_user():
    return random.choice(list(users.keys()))

def random_approval():
    return random.choice(["true", "false"])

def random_location():
    return random.choice(location)

def random_duration():
    return random.choice(duration)

def random_max_member():
    return random.randint(2, 12)

def random_tag():
    num_tags = random.randint(1, 3)
    selected_tags = random.sample(tags, num_tags)  # sample without repetition
    return str(selected_tags).replace("'", '"')

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
        Gender = "{random_gender()}"
    }},""")
        

def generate_activities():
    owner = random_user()
    current_time = datetime.utcnow().strftime("%Y-%m-%dT%H:%M")
    activity_time = random_datetime(2025, 2025)
    deadline_time = (datetime.strptime(activity_time, "%Y-%m-%dT%H:%M") - timedelta(hours=1)).strftime("%Y-%m-%dT%H:%M")
    duration = "01:00"
    print(f"""new ActivityModel
    {{
        Owner = "{owner}",
        Title = "กินหมูกระทะเกกี4ค่ะ",
        Detail = "หาเพื่อนกินหมูกระทะเกกี4ค่ะ จ่ายเองนะคะไม่เลี้ยงค่ะ",
        Create_time = "{current_time}",
        Activity_time = "{activity_time}",
        Deadline_time = "{deadline_time}",
        Duration = "{duration}",
        Location = "{random_location()}",
        Max_member = {random_max_member()},
        Approval = {random_approval()},
        Tags = {random_tag()},
        Requirement = {{
            Gender = "{random_gender_req()}",
            Age = {random_age_req()},
            Other = "หน้าตาดีพิจารณาเป็นพิเศษ"
        }},
        Participants = {{
            new ParticipantModel {{
                Username = "{owner}",
                Role = "host"
            }}
        }},
        Status = "open"
    }},""")
    
def generate_activities_json():
    owner = random_user()
    activity_time = random_datetime(2025, 2025)
    deadline_time = (datetime.strptime(activity_time, "%Y-%m-%dT%H:%M") - timedelta(hours=1)).strftime("%Y-%m-%dT%H:%M")
    print(f"""
    {{
        "Owner":"{owner}",
        "Title":"หาคนเลี้ยงข้าวครับ",
        "Detail":"เดือนนี้ผมโดนสาวหลอกหมดตัวเลยครับ",
        "Activity_time":"{activity_time}",
        "Deadline_time":"{deadline_time}",
        "Duration":"{random_duration()}",
        "Location":"{random_location()}",
        "Max_member": {random_max_member()},
        "Approval":{random_approval()},
        "Tags": {random_tag()},
        "Requirement":{{
            "Gender":"{random_gender_req()}",
            "Age":{random_age_req()},
            "Other":"หน้าตาดีพิจารณาเป็นพิเศษ"}}
        
    }},""")
        
# generate_users()
for i in range(1):
    generate_activities_json()