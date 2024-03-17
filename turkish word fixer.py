def turkish_uppercase(text: str):
    return text.replace("i", "İ").replace("ı", "I").upper()

def turkish_lowercase(text: str):
    return text.replace("I", "ı").replace("İ", "i").lower()

def replace_hat(text: str):
    return text.replace("â", "a").replace("î", "i").replace("û", "u").replace("Â", "A").replace("Î", "İ").replace("Û", "U")

with(open("words.txt", 'r', encoding="utf-8") as word_list):
    with(open('fixed_words.txt', 'w', encoding="utf-8") as fixed_words):
        for line in word_list.readlines():
            line.strip("\n")
            if line.find(" ") == -1 and line != "\n":
                line  = replace_hat(turkish_lowercase(line))
                fixed_words.write(line)

