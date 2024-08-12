// import { Subscription } from '@prisma/client';
// import { ResourceNotFoundError } from '../shared/errors/resource-not-found.error';
// import dayjs from 'dayjs';
// import { LateCheckInValidateError } from '../shared/errors/late-check-in-validate.error';
// import { SubscriptionsRepository } from '../../repositories/subscription.repository';

// interface UpdateSubscriptionUseCaseRequest {
//   subscriptionId: string;
// }

// interface UpdateSubscriptionUseCaseResponse {
//   subscription: Subscription;
// }

// export class UpdateSubscriptionUseCase {
//   constructor(private subscriptionRepository: SubscriptionsRepository) {}

//   async execute({ subscriptionId }: UpdateSubscriptionUseCaseRequest): Promise<UpdateSubscriptionUseCaseResponse> {
//     const subscription = await this.subscriptionRepository.findById(checkInId);

//     if (!checkIn) throw new ResourceNotFoundError();

//     checkIn.validated_at = new Date();

//     const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(checkIn.created_at, 'minutes');

//     if (distanceInMinutesFromCheckInCreation > 20) throw new LateCheckInValidateError();

//     await this.checkInsRepository.save(checkIn);

//     return {
//       checkIn,
//     };
//   }
// }
