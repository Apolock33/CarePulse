import RegisterForm from '@/components/forms/registerForm';
import { getUser } from '@/lib/actions/patient.actions';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react';
import * as Sentry from '@sentry/nextjs';

const Register = async ({ params: { userId } }: SearchParamProps) => {
    const user = await getUser(userId);

    Sentry.metrics.set("user_view_register", user?.name);

    return (
        <div className="flex h-screen max-h-screen">

            {/* TODO: OTP verification | PassKeyModal */}

            <section className="remove-scrollbar container">
                <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
                    <Image
                        src='/assets/icons/logo-full.svg'
                        alt='patient'
                        width={1000}
                        height={1000}
                        className='mb-12 h-10 w-fit'
                    />

                    <RegisterForm user={user} />

                    <p className="text-dark-600 copywright py-12">
                        &copy; 2024 CarePulse
                    </p>
                </div>
            </section>

            <Image
                src='/assets/images/register-img.png'
                alt={'register img'}
                height={1000}
                width={1000}
                className='side-img max-w-[490px]'
            />
        </div>
    )
}

export default Register