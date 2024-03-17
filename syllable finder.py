def syllable_frequencies(input, output_freq, output_words):
    max_syllable_length = 3
    syllable_freq = {}
    syllable_words = {}
    with open(input, "r", encoding="utf-8") as words_file:
            words_file = tuple(words_file.readlines())
            for syllable_length in range(2, max_syllable_length+1):
                for word in words_file:
                    word = word.strip("\n")
                    word = turkish_lowercase(word)
                    if len(word) == 1:
                        continue
                    i = 0
                    syllable = ""
                    for j in range(len(word)):
                        char = word[j]
                        syllable += char
                        i += 1
                        if i == syllable_length:
                            syllable_freq[syllable] = 0
                            syllable_words[syllable] = []
                            syllable = ""
                            i = 0
                        if j + 1 == len(word):
                            syllable = ""
                            i = 0
            for syllable in syllable_freq.keys():
                for word in words_file:
                    word = word.strip("\n")
                    word = turkish_lowercase(word)
                    if syllable in word:
                        syllable_freq[syllable] += 1
                        syllable_words[syllable].append(word)
    with open(output_freq, "w", encoding="utf-8") as output_file:
        output_file.writelines(str(sorted(syllable_freq.items(), key= lambda item : item[1], reverse=True)))
    with open(output_words, "w", encoding="utf-8") as output_file:
        output_file.writelines(str(sorted(syllable_words.items(), key= lambda item : len(item[1]), reverse=True)))
    print("done!")

def turkish_uppercase(text: str):
    return text.replace("i", "İ").replace("ı", "I").upper()

def turkish_lowercase(text):
    return text.replace("I", "ı").replace("İ", "i").lower()

input_file = "fixed_words.txt"
output_freq_file = "syllable_freq.txt"
output_words_file = "syllable_words.txt"

syllable_frequencies(input_file, output_freq_file, output_words_file)