'use client';

import * as React from 'react';
import { HelpCircle, MessageCircle, ChevronDown } from 'lucide-react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@/lib/utils';

const CustomAccordion = AccordionPrimitive.Root;

const CustomAccordionItem = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item
		ref={ref}
		className={cn('', className)}
		{...props}
	/>
));
CustomAccordionItem.displayName = 'CustomAccordionItem';

const CustomAccordionTrigger = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Header className="flex">
		<AccordionPrimitive.Trigger
			ref={ref}
			className={cn(
				'group flex flex-1 items-center justify-between gap-4 rounded-2xl p-5 text-left',
				'card-gradient text-[#FBF6EE] transition-all hover:shadow-md data-[state=open]:border-[#36B1C7]/30',
				'hover:border-[#D3AF37]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#36B1C7]',
				className
			)}
			{...props}
		>
			<div className="flex items-center gap-4">
				<HelpCircle className="h-5 w-5 text-[#36B1C7]" />
				<span className="text-lg font-medium tracking-wide group-hover:text-[#D3AF37] transition-colors">
					{children}
				</span>
			</div>
			<div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/5 transition-transform group-hover:scale-105 group-data-[state=open]:rotate-180">
				<ChevronDown className="h-4 w-4 text-[#FBF6EE]" />
			</div>
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
));
CustomAccordionTrigger.displayName = 'CustomAccordionTrigger';

const CustomAccordionContent = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Content
		ref={ref}
		className={cn(
			'overflow-hidden text-[#E8D8C3]/70',
			'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down pb-2',
			className
		)}
		{...props}
	>
		<div className="mt-4 ml-14">
			<div className="flex items-start gap-4 rounded-2xl card-gradient p-4 shadow-md transition-all">
				<span className="flex-1 text-md leading-relaxed">{children}</span>
				<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/5 transition-transform hover:scale-105">
					<MessageCircle className="h-5 w-5 text-[#36B1C7]" />
				</div>
			</div>
		</div>
	</AccordionPrimitive.Content>
));
CustomAccordionContent.displayName = 'CustomAccordionContent';

export {
	CustomAccordion,
	CustomAccordionItem,
	CustomAccordionTrigger,
	CustomAccordionContent,
};

const faqs = [
	{
		question: 'Do You Offer Revisions On Designs?',
		answer:
			'Yes, I Provide Revisions To Ensure The Final Design Aligns Perfectly With Your Expectations.',
	},
	{
		question: 'What Tools Do You Use For Your Work?',
		answer:
			'I use industry-standard design software including Adobe Creative Suite, Figma, and Sketch to create professional and polished designs.',
	},
	{
		question: 'Can You Help With Branding From Scratch?',
		answer:
			'I offer comprehensive branding services from logo design to complete brand identity systems tailored to your business needs.',
	},
	{
		question: 'How Do You Approach A New Project?',
		answer:
			'I begin with a thorough discovery phase to understand your goals, followed by research, conceptualization, design development, and refinement based on your feedback.',
	},
	{
		question: 'What Is The Cost Of Your Services?',
		answer:
			'Pricing varies based on project scope and requirements. I offer customized quotes after understanding your specific needs to ensure fair and transparent pricing.',
	},
];

export function AccordionComponent() {
	return (
		<div className="w-full flex flex-col items-center justify-center py-20 px-4 md:px-8">
			<div className="max-w-3xl w-full mx-auto">
				<h2 className="mb-12 text-center text-3xl font-bold md:text-4xl text-[#36B1C7] font-serif">
					Frequently Asked Questions
				</h2>
				<CustomAccordion
					type="single"
					collapsible
					defaultValue="item-0"
					className="space-y-4"
				>
					{faqs.map((faq, index) => (
						<CustomAccordionItem
							key={index}
							value={`item-${index}`}
						>
							<CustomAccordionTrigger>{faq.question}</CustomAccordionTrigger>
							<CustomAccordionContent>{faq.answer}</CustomAccordionContent>
						</CustomAccordionItem>
					))}
				</CustomAccordion>
			</div>
		</div>
	);
}
