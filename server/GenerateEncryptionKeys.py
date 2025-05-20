import secrets

key_hex_string = secrets.token_hex(32)
iv_hex_string = secrets.token_hex(16)

print(f"Encryption Key: {key_hex_string}")
print(f"Encryption IV: {iv_hex_string}")
