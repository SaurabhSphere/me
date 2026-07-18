# import os
# import csv

# root = r"F:\KCC_data_gov_in"  # CHANGE THIS

# output_file = "local_file_list.csv"

# print("Scanning local files...")

# with open(output_file, "w", newline="", encoding="utf-8") as f:
#     writer = csv.writer(f)
#     writer.writerow(["relative_path", "size"])

#     for path, dirs, files in os.walk(root):
#         for file in files:
#             full_path = os.path.join(path, file)
#             rel_path = os.path.relpath(full_path, root)
#             try:
#                 size = os.path.getsize(full_path)
#             except:
#                 size = -1

#             writer.writerow([rel_path, size])

# print(f"\nDone! File saved as: {output_file}")

import os
import json

root = r"F:\KCC_data_gov_in"  # CHANGE THIS

def build_tree(path):
    tree = {"type": "folder", "size": 0, "children": {}}

    for item in os.listdir(path):
        full_path = os.path.join(path, item)

        if os.path.isdir(full_path):
            subtree = build_tree(full_path)
            tree["children"][item] = subtree
            tree["size"] += subtree["size"]

        else:
            try:
                size = os.path.getsize(full_path)
            except:
                size = -1

            tree["children"][item] = {
                "type": "file",
                "size": size
            }
            tree["size"] += size

    return tree

print("Building local folder tree...")

tree = build_tree(root)

with open("local_tree.json", "w", encoding="utf-8") as f:
    json.dump(tree, f)

print("Done! Saved as local_tree.json")