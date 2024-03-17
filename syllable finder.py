import json
def syllable_frequencies(input, words_json, freqs_json):
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
    with open(words_json, "w", encoding="utf-8") as json_out:
        word_json = json.dumps(syllable_words, indent=4, ensure_ascii=False)
        json_out.write(word_json)
    with open(freqs_json, "w", encoding="utf-8") as json_out:
        freq_json = json.dumps(syllable_freq, indent=4, ensure_ascii=False)
        json_out.write(freq_json)
    print("done!")

def turkish_uppercase(text: str):
    return text.replace("i", "İ").replace("ı", "I").upper()

def turkish_lowercase(text):
    return text.replace("I", "ı").replace("İ", "i").lower()

input_file = "fixed_words.txt"
words_json = "./Bomba Partisi Site/words.json"
freqs_json = "./Bomba Partisi Site/freqs.json"

syllable_frequencies(input_file, words_json, freqs_json)