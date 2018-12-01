{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 0,
			"revision" : 2,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 153.0, 674.0, 599.0, 631.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 288.0, 120.0, 33.0, 22.0 ],
					"text" : "grab"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-7",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 168.0, 120.0, 33.0, 22.0 ],
					"text" : "grab"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 302.0, 200.0, 64.0, 22.0 ],
					"restore" : [ 0.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_invisible" : 1,
							"parameter_longname" : "scale",
							"parameter_shortname" : "scale",
							"parameter_type" : 3
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"parameter_mappable" : 0
					}
,
					"text" : "pattr scale",
					"varname" : "scale"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-4",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 6,
					"outlettype" : [ "bang", "bang", "bang", "bang", "bang", "bang" ],
					"patching_rect" : [ 408.0, 120.0, 72.0, 22.0 ],
					"text" : "t b b b b b b"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-5",
					"maxclass" : "newobj",
					"numinlets" : 5,
					"numoutlets" : 5,
					"outlettype" : [ "", "", "", "", "" ],
					"patching_rect" : [ 48.0, 76.0, 499.0, 22.0 ],
					"text" : "route tracks duration scale bang"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-18",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 372.918609619140625, 432.0, 98.0, 22.0 ],
					"text" : "prepend tracks 3"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-17",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 264.951141357421875, 432.0, 98.0, 22.0 ],
					"text" : "prepend tracks 2"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-16",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 156.475570678710938, 432.0, 98.0, 22.0 ],
					"text" : "prepend tracks 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-15",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 48.0, 432.0, 98.0, 22.0 ],
					"text" : "prepend tracks 0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-14",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 182.0, 243.0, 99.0, 22.0 ],
					"text" : "prepend duration"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-13",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 302.0, 243.0, 84.0, 22.0 ],
					"text" : "prepend scale"
				}

			}
, 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-3",
					"index" : 0,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 517.0, 573.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "newobj",
					"numinlets" : 5,
					"numoutlets" : 5,
					"outlettype" : [ "", "", "", "", "" ],
					"patching_rect" : [ 48.0, 352.0, 452.90228271484375, 22.0 ],
					"text" : "route 0 1 2 3"
				}

			}
, 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-1",
					"index" : 0,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 48.0, 20.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-94",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 182.0, 200.0, 79.0, 22.0 ],
					"restore" : [ 0.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "128th", "64th", "64th dotted", "32nd triplet", "32nd", "32nd dotted", "16th triplet", "16th", "16th dotted", "eighth triplet", "eighth", "eighth dotted", "quarter triplet", "quarter", "quarter dotted", "half triplet", "half", "half dotted", "whole triplet", "whole", "whole dotted" ],
							"parameter_invisible" : 1,
							"parameter_longname" : "duration",
							"parameter_shortname" : "duration",
							"parameter_type" : 3
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1,
						"parameter_mappable" : 0
					}
,
					"text" : "pattr duration",
					"varname" : "duration"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-42",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 372.918609619140625, 392.0, 72.0, 22.0 ],
					"text" : "track 3",
					"varname" : "tracks[3]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-37",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 264.951141357421875, 392.0, 72.0, 22.0 ],
					"text" : "track 2",
					"varname" : "tracks[2]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-35",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 156.475570678710938, 392.0, 72.0, 22.0 ],
					"text" : "track 1",
					"varname" : "tracks[1]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-121",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 48.0, 392.0, 72.0, 22.0 ],
					"text" : "track 0",
					"varname" : "tracks[0]"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 0 ],
					"source" : [ "obj-121", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"midpoints" : [ 311.5, 321.0, 526.5, 321.0 ],
					"source" : [ "obj-13", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"midpoints" : [ 191.5, 321.0, 526.5, 321.0 ],
					"source" : [ "obj-14", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"source" : [ "obj-15", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"source" : [ "obj-16", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"source" : [ "obj-17", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"source" : [ "obj-18", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-121", 0 ],
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-35", 0 ],
					"source" : [ "obj-2", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-37", 0 ],
					"source" : [ "obj-2", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-42", 0 ],
					"source" : [ "obj-2", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 0 ],
					"source" : [ "obj-35", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-17", 0 ],
					"source" : [ "obj-37", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.701961, 0.701961, 0.701961, 1.0 ],
					"destination" : [ "obj-121", 0 ],
					"source" : [ "obj-4", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.701961, 0.701961, 0.701961, 1.0 ],
					"destination" : [ "obj-35", 0 ],
					"source" : [ "obj-4", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.701961, 0.701961, 0.701961, 1.0 ],
					"destination" : [ "obj-37", 0 ],
					"source" : [ "obj-4", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.701961, 0.701961, 0.701961, 1.0 ],
					"destination" : [ "obj-42", 0 ],
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.701961, 0.701961, 0.701961, 1.0 ],
					"destination" : [ "obj-6", 0 ],
					"source" : [ "obj-4", 4 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.701961, 0.701961, 0.701961, 1.0 ],
					"destination" : [ "obj-94", 0 ],
					"source" : [ "obj-4", 5 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-18", 0 ],
					"source" : [ "obj-42", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"source" : [ "obj-5", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 0 ],
					"source" : [ "obj-5", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-5", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"source" : [ "obj-5", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-94", 0 ],
					"source" : [ "obj-7", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"source" : [ "obj-8", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 0 ],
					"source" : [ "obj-94", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-121::obj-11::obj-33" : [ "mute[37]", "mute", 0 ],
			"obj-42::obj-1::obj-24" : [ "end", "end", 0 ],
			"obj-35::obj-9::obj-22" : [ "start[38]", "start", 0 ],
			"obj-37::obj-52" : [ "mute[47]", "mute", 0 ],
			"obj-42::obj-3::obj-33" : [ "mute[10]", "mute", 0 ],
			"obj-121::obj-1::obj-22" : [ "start[42]", "start", 0 ],
			"obj-121::obj-12::obj-24" : [ "end[114]", "end", 0 ],
			"obj-6" : [ "scale", "scale", 0 ],
			"obj-35::obj-11::obj-33" : [ "mute[30]", "mute", 0 ],
			"obj-35::obj-1::obj-24" : [ "end[7]", "end", 0 ],
			"obj-37::obj-10::obj-2" : [ "steps[11]", "steps", 0 ],
			"obj-121::obj-3::obj-2" : [ "steps[42]", "steps", 0 ],
			"obj-35::obj-12::obj-24" : [ "end[89]", "end", 0 ],
			"obj-35::obj-52" : [ "mute[49]", "mute", 0 ],
			"obj-42::obj-10::obj-33" : [ "mute[13]", "mute", 0 ],
			"obj-35::obj-2::obj-24" : [ "end[110]", "end", 0 ],
			"obj-35::obj-55" : [ "velocity[7]", "velocity", 0 ],
			"obj-121::obj-4::obj-22" : [ "start[45]", "start", 0 ],
			"obj-121::obj-12::obj-33" : [ "mute[50]", "mute", 0 ],
			"obj-37::obj-1::obj-24" : [ "end[6]", "end", 0 ],
			"obj-42::obj-11::obj-2" : [ "steps[5]", "steps", 0 ],
			"obj-35::obj-3::obj-22" : [ "start[36]", "start", 0 ],
			"obj-37::obj-10::obj-33" : [ "mute[21]", "mute", 0 ],
			"obj-37::obj-56" : [ "pitch[6]", "pitch", 0 ],
			"obj-121::obj-9::obj-33" : [ "mute[35]", "mute", 0 ],
			"obj-37::obj-2::obj-2" : [ "steps[7]", "steps", 0 ],
			"obj-42::obj-12::obj-24" : [ "end[107]", "end", 0 ],
			"obj-35::obj-4::obj-33" : [ "mute[24]", "mute", 0 ],
			"obj-42::obj-4::obj-2" : [ "steps[2]", "steps", 0 ],
			"obj-121::obj-10::obj-33" : [ "mute[36]", "mute", 0 ],
			"obj-37::obj-3::obj-24" : [ "end[80]", "end", 0 ],
			"obj-42::obj-55" : [ "velocity[3]", "velocity", 0 ],
			"obj-35::obj-9::obj-24" : [ "end[9]", "end", 0 ],
			"obj-37::obj-11::obj-33" : [ "mute[22]", "mute", 0 ],
			"obj-42::obj-1::obj-22" : [ "start", "start", 0 ],
			"obj-42::obj-3::obj-24" : [ "end[78]", "end", 0 ],
			"obj-121::obj-11::obj-2" : [ "steps[21]", "steps", 0 ],
			"obj-37::obj-4::obj-33" : [ "mute[19]", "mute", 0 ],
			"obj-37::obj-9::obj-24" : [ "end[83]", "end", 0 ],
			"obj-35::obj-10::obj-22" : [ "start[39]", "start", 0 ],
			"obj-42::obj-4::obj-33" : [ "mute[11]", "mute", 0 ],
			"obj-121::obj-2::obj-24" : [ "end[112]", "end", 0 ],
			"obj-37::obj-11::obj-2" : [ "steps[12]", "steps", 0 ],
			"obj-121::obj-3::obj-24" : [ "end[100]", "end", 0 ],
			"obj-42::obj-9::obj-22" : [ "start[22]", "start", 0 ],
			"obj-37::obj-11::obj-24" : [ "end[108]", "end", 0 ],
			"obj-121::obj-4::obj-24" : [ "end[102]", "end", 0 ],
			"obj-121::obj-52" : [ "mute[28]", "mute", 0 ],
			"obj-121::obj-55" : [ "velocity", "velocity", 0 ],
			"obj-37::obj-12::obj-22" : [ "start[33]", "start", 0 ],
			"obj-121::obj-9::obj-22" : [ "start[46]", "start", 0 ],
			"obj-121::obj-56" : [ "pitch", "pitch", 0 ],
			"obj-37::obj-53" : [ "multiplier[6]", "multiplier", 0 ],
			"obj-121::obj-10::obj-2" : [ "steps[20]", "steps", 0 ],
			"obj-37::obj-3::obj-2" : [ "steps[8]", "steps", 0 ],
			"obj-42::obj-56" : [ "pitch[3]", "pitch", 0 ],
			"obj-42::obj-2::obj-33" : [ "mute[9]", "mute", 0 ],
			"obj-121::obj-11::obj-22" : [ "start[48]", "start", 0 ],
			"obj-37::obj-4::obj-24" : [ "end[81]", "end", 0 ],
			"obj-121::obj-1::obj-2" : [ "steps[40]", "steps", 0 ],
			"obj-121::obj-12::obj-22" : [ "start[49]", "start", 0 ],
			"obj-37::obj-9::obj-22" : [ "start[30]", "start", 0 ],
			"obj-121::obj-2::obj-22" : [ "start[43]", "start", 0 ],
			"obj-35::obj-11::obj-22" : [ "start[40]", "start", 0 ],
			"obj-42::obj-1::obj-2" : [ "steps", "steps", 0 ],
			"obj-42::obj-9::obj-33" : [ "mute[12]", "mute", 0 ],
			"obj-35::obj-1::obj-33" : [ "mute[77]", "mute", 0 ],
			"obj-37::obj-10::obj-24" : [ "end[85]", "end", 0 ],
			"obj-42::obj-10::obj-24" : [ "end[105]", "end", 0 ],
			"obj-121::obj-2::obj-33" : [ "mute[32]", "mute", 0 ],
			"obj-35::obj-2::obj-22" : [ "start[35]", "start", 0 ],
			"obj-37::obj-12::obj-24" : [ "end[109]", "end", 0 ],
			"obj-42::obj-53" : [ "multiplier[3]", "multiplier", 0 ],
			"obj-94" : [ "duration", "duration", 0 ],
			"obj-37::obj-1::obj-33" : [ "mute[16]", "mute", 0 ],
			"obj-37::obj-2::obj-24" : [ "end[79]", "end", 0 ],
			"obj-42::obj-11::obj-33" : [ "mute[14]", "mute", 0 ],
			"obj-121::obj-3::obj-33" : [ "mute[33]", "mute", 0 ],
			"obj-35::obj-3::obj-2" : [ "steps[14]", "steps", 0 ],
			"obj-37::obj-54" : [ "gate[6]", "gate", 0 ],
			"obj-121::obj-54" : [ "gate", "gate", 0 ],
			"obj-37::obj-2::obj-22" : [ "start[27]", "start", 0 ],
			"obj-42::obj-12::obj-2" : [ "steps[6]", "steps", 0 ],
			"obj-35::obj-4::obj-22" : [ "start[37]", "start", 0 ],
			"obj-37::obj-9::obj-33" : [ "mute[20]", "mute", 0 ],
			"obj-42::obj-2::obj-2" : [ "steps[69]", "steps", 0 ],
			"obj-37::obj-3::obj-33" : [ "mute[18]", "mute", 0 ],
			"obj-35::obj-9::obj-33" : [ "mute[25]", "mute", 0 ],
			"obj-42::obj-3::obj-2" : [ "steps[1]", "steps", 0 ],
			"obj-42::obj-3::obj-22" : [ "start[20]", "start", 0 ],
			"obj-121::obj-1::obj-24" : [ "end[98]", "end", 0 ],
			"obj-37::obj-4::obj-2" : [ "steps[9]", "steps", 0 ],
			"obj-35::obj-10::obj-2" : [ "steps[17]", "steps", 0 ],
			"obj-35::obj-12::obj-33" : [ "mute[48]", "mute", 0 ],
			"obj-42::obj-2::obj-24" : [ "end[5]", "end", 0 ],
			"obj-42::obj-4::obj-24" : [ "end[103]", "end", 0 ],
			"obj-121::obj-2::obj-2" : [ "steps[41]", "steps", 0 ],
			"obj-35::obj-1::obj-22" : [ "start[34]", "start", 0 ],
			"obj-37::obj-10::obj-22" : [ "start[31]", "start", 0 ],
			"obj-121::obj-3::obj-22" : [ "start[44]", "start", 0 ],
			"obj-35::obj-12::obj-22" : [ "start[41]", "start", 0 ],
			"obj-35::obj-12::obj-2" : [ "steps[19]", "steps", 0 ],
			"obj-35::obj-2::obj-33" : [ "mute[78]", "mute", 0 ],
			"obj-37::obj-11::obj-22" : [ "start[32]", "start", 0 ],
			"obj-42::obj-10::obj-2" : [ "steps[4]", "steps", 0 ],
			"obj-121::obj-4::obj-2" : [ "steps[61]", "steps", 0 ],
			"obj-37::obj-1::obj-22" : [ "start[26]", "start", 0 ],
			"obj-37::obj-12::obj-33" : [ "mute[45]", "mute", 0 ],
			"obj-42::obj-11::obj-22" : [ "start[24]", "start", 0 ],
			"obj-35::obj-3::obj-33" : [ "mute[23]", "mute", 0 ],
			"obj-35::obj-54" : [ "gate[7]", "gate", 0 ],
			"obj-42::obj-9::obj-2" : [ "steps[3]", "steps", 0 ],
			"obj-121::obj-9::obj-2" : [ "steps[63]", "steps", 0 ],
			"obj-37::obj-2::obj-33" : [ "mute[17]", "mute", 0 ],
			"obj-42::obj-12::obj-22" : [ "start[25]", "start", 0 ],
			"obj-35::obj-4::obj-24" : [ "end[8]", "end", 0 ],
			"obj-121::obj-10::obj-24" : [ "end[11]", "end", 0 ],
			"obj-35::obj-11::obj-2" : [ "steps[18]", "steps", 0 ],
			"obj-37::obj-3::obj-22" : [ "start[28]", "start", 0 ],
			"obj-42::obj-54" : [ "gate[3]", "gate", 0 ],
			"obj-35::obj-9::obj-2" : [ "steps[16]", "steps", 0 ],
			"obj-121::obj-11::obj-24" : [ "end[12]", "end", 0 ],
			"obj-37::obj-4::obj-22" : [ "start[29]", "start", 0 ],
			"obj-121::obj-1::obj-33" : [ "mute[31]", "mute", 0 ],
			"obj-35::obj-10::obj-24" : [ "end[10]", "end", 0 ],
			"obj-42::obj-4::obj-22" : [ "start[21]", "start", 0 ],
			"obj-37::obj-9::obj-2" : [ "steps[10]", "steps", 0 ],
			"obj-35::obj-10::obj-33" : [ "mute[29]", "mute", 0 ],
			"obj-35::obj-11::obj-24" : [ "end[87]", "end", 0 ],
			"obj-42::obj-9::obj-24" : [ "end[104]", "end", 0 ],
			"obj-35::obj-1::obj-2" : [ "steps[38]", "steps", 0 ],
			"obj-121::obj-4::obj-33" : [ "mute[34]", "mute", 0 ],
			"obj-35::obj-53" : [ "multiplier[7]", "multiplier", 0 ],
			"obj-42::obj-10::obj-22" : [ "start[23]", "start", 0 ],
			"obj-35::obj-2::obj-2" : [ "steps[39]", "steps", 0 ],
			"obj-35::obj-56" : [ "pitch[7]", "pitch", 0 ],
			"obj-37::obj-12::obj-2" : [ "steps[13]", "steps", 0 ],
			"obj-121::obj-9::obj-24" : [ "end[113]", "end", 0 ],
			"obj-121::obj-53" : [ "multiplier", "multiplier", 0 ],
			"obj-37::obj-1::obj-2" : [ "steps[70]", "steps", 0 ],
			"obj-42::obj-11::obj-24" : [ "end[106]", "end", 0 ],
			"obj-121::obj-12::obj-2" : [ "steps[22]", "steps", 0 ],
			"obj-35::obj-3::obj-24" : [ "end[111]", "end", 0 ],
			"obj-37::obj-55" : [ "velocity[6]", "velocity", 0 ],
			"obj-121::obj-10::obj-22" : [ "start[47]", "start", 0 ],
			"obj-42::obj-12::obj-33" : [ "mute[15]", "mute", 0 ],
			"obj-42::obj-52" : [ "mute[46]", "mute", 0 ],
			"obj-35::obj-4::obj-2" : [ "steps[15]", "steps", 0 ],
			"obj-42::obj-1::obj-33" : [ "mute", "mute", 0 ],
			"obj-42::obj-2::obj-22" : [ "start[19]", "start", 0 ],
			"parameterbanks" : 			{

			}

		}
,
		"dependency_cache" : [ 			{
				"name" : "track.maxpat",
				"bootpath" : "D:/workspace/Max/Max-for-Live/m4l-launchpad-sequencer/launchpad-sequencer/launchpad-sequencer-device-project",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "pattern.maxpat",
				"bootpath" : "D:/workspace/Max/Max-for-Live/m4l-launchpad-sequencer/launchpad-sequencer/launchpad-sequencer-device-project",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
 ],
		"autosave" : 0
	}

}
