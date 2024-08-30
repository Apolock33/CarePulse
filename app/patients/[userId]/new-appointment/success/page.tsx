import Link from 'next/link';
import Image from 'next/image';
import React from 'react'
import { getAppointment } from '@/lib/actions/appointment.action';
import { Doctors } from '@/constants';
import { formatDateTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import * as Sentry from '@sentry/nextjs'
import { getUser } from '@/lib/actions/patient.actions';

const Success = async ({ params: { userId }, searchParams }: SearchParamProps) => {
    const appointmentId = (searchParams?.appointmentId as string) || '';
    const appointment = await getAppointment(appointmentId);

    const doctor = Doctors.find((doc) => doc.name === appointment?.primaryPhysician);

    const user = await getUser(userId);

    Sentry.metrics.set("user_view_appointment-success", user.name);

    return (
        <div className='flex h-screen max-h-screen px-[5%]'>
            <div className='success-img'>
                <Link href={'/'}>
                    <Image
                        src="/assets/icons/logo-full.svg"
                        height={1000}
                        width={1000}
                        alt='logo'
                        className='h-10 w-fit'
                    />
                </Link>

                <section className='flex flex-col items-center'>
                    <Image
                        src='/assets/gifs/success.gif'
                        alt='success icon'
                        height={300}
                        width={300}
                    />
                    <div className='header mb-6 max-w-[600px] text-center'>
                        Your <span className='text-green-500'>Appointment Request</span> has been successfully submitted
                    </div>
                    <p>We'll be in touch shortly to confirm.</p>
                </section>

                <section className='request-details'>
                    <p>Requested appointment details:</p>
                    <div className='flex items-center gap-3'>
                        <Image
                            src={doctor?.image!}
                            alt='doctor img'
                            width={100}
                            height={100}
                            className='size-6'
                        />
                        <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
                    </div>
                    <div className='flex gap-2'>
                        <Image
                            src='/assets/icons/calendar.svg'
                            width={24}
                            height={24}
                            className=''
                            alt='calendar icon'
                        />
                        <p>{formatDateTime(appointment.schedule).dateTime}</p>
                    </div>
                </section>

                <Button variant='outline' className='shad-primary-btn'>
                    <Link href={`/patients/${userId}/new-appointment`}>
                        New Appointment
                    </Link>
                </Button>

                <p className='copyright'>© 2024 CarePulse</p>
            </div>
        </div>
    )
}

export default Success;