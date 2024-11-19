// part of MoodOfTheDay Component, allowing users to choose their mood factors functionality
'use client';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from './ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from './ui/form';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { FormValues } from '@/lib/formSchema';
import { CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { factors } from '@/lib/constants';
import AnimatedImage from './AnimatedImage';

interface FactorsStepProps {
  sliderValue: number;
  step: number;
  setStep: (step: number) => void;
  selectedFactors: string[];
  setSelectedFactors: (factors: string[]) => void;
  form: UseFormReturn<FormValues>;
  selectedMood: string;
  moodIcon: string;
  onNext: () => void;
  onPrevious: () => void;
}

const FactorsStep: React.FC<FactorsStepProps> = ({
  sliderValue,
  step,
  setStep,
  selectedFactors,
  setSelectedFactors,
  form,
  selectedMood,
  moodIcon,
  onPrevious,
}) => {
  // Handler for submitting the factors form
  const handleFactorsSubmit = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      setSelectedFactors(form.getValues('factors'));
      setStep(step + 1);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form className='text-center flex flex-col justify-between items-center h-full'>
          <CardHeader className='pt-0 pb-1'>
            <CardTitle className='text-2xl '>Factors</CardTitle>
            <div className='flex flex-col items-center'>
              <AnimatedImage
                src={moodIcon}
                alt={selectedMood}
                className='x0:size-16 mb-2'
                rotate={sliderValue}
              />
            </div>
            <CardDescription className='font-medium'>
              What factors had the greatest influence?
            </CardDescription>
          </CardHeader>

          <CardContent className='pb-4'>
            {/* Scrollable area for factor selection */}
            <ScrollArea className='h-40 w-60 rounded-md border dark:border-[#4d4d4d]'>
              <div className='pt-2'>
                {factors.map((factor) => (
                  <FormField
                    key={factor}
                    control={form.control}
                    name='factors'
                    render={({ field }) => (
                      <>
                        <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                          <FormControl>
                            <Checkbox
                              className='ml-2'
                              checked={field.value.includes(factor)}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...selectedFactors, factor]
                                  : selectedFactors.filter(
                                      (item) => item !== factor
                                    );
                                form.setValue('factors', newValue);
                                setSelectedFactors(newValue);
                              }}
                            />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            {factor}
                          </FormLabel>
                        </FormItem>
                        <Separator className='my-2' />
                      </>
                    )}
                  />
                ))}
                <FormMessage />
              </div>
            </ScrollArea>
          </CardContent>
          <div className='justify-center flex gap-2'>
            <Button onClick={onPrevious}>Back</Button>
            <Button
              onClick={handleFactorsSubmit}
              disabled={!form.watch('factors').length}
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FactorsStep;
