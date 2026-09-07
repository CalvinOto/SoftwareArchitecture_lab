import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsNotEmpty, Validate, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isValidEmail', async: false })
export class IsValidEmailConstraint implements ValidatorConstraintInterface {
  validate(email: string, args: ValidationArguments) {
    if (!email) return false;
    const atCount = email.split('@').length - 1;
    if (atCount !== 1) return false;
    if (!email.includes('.')) return false;
    if (email.includes('@.') || email.includes('.@')) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email must contain exactly one "@", at least one ".", and cannot be adjacent';
  }
}

@ValidatorConstraint({ name: 'isStrongPassword', async: false })
export class IsStrongPasswordConstraint implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    if (!password) return false;

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';

    const hasUppercase = password.split('').some(c => uppercaseChars.includes(c));
    const hasLowercase = password.split('').some(c => lowercaseChars.includes(c));
    const hasNumber = password.split('').some(c => numberChars.includes(c));
    const hasSpecial = password.split('').some(c =>
      !uppercaseChars.includes(c) && !lowercaseChars.includes(c) && !numberChars.includes(c)
    );

    return hasUppercase && hasLowercase && hasNumber && hasSpecial;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
  }
}

export class RegisterDto {
  @ApiProperty({ example: 'user123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: 'Username must be at least 4 characters long' })
  @MaxLength(40, { message: 'Username must be at most 40 characters long' })
  username: string;

  @ApiProperty({ example: 'user123@example.com' })
  @IsString()
  @IsNotEmpty()
  @Validate(IsValidEmailConstraint)
  email: string;

  @ApiProperty({ example: 'Indonesia' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: 'Password123!' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(40, { message: 'Password must be at most 40 characters long' })
  @Validate(IsStrongPasswordConstraint)
  password: string;
}